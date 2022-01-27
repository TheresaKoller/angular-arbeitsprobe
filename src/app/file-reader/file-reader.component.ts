import { Component, Output, EventEmitter } from '@angular/core';
import {getLocaleTimeFormat} from "@angular/common";
import {__spread} from "tslib";

@Component({
  selector: 'file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css']
})
export class FileReaderComponent {
  fileOutput;
  result = new Array();
  result2 = new Array();
  isExpanded = new Array();

  changeExpandStatus(i){
    if(this.isExpanded[i]==true){
      this.isExpanded[i]= false;
    }
    else {
      this.isExpanded[i] = true;
    }
  }

  getRoles(index_role, zeilen){
    let roles = zeilen[index_role];
    let found = true;
    index_role=index_role+1;
    while(found){
      if(zeilen[index_role].search("[\+]")!== -1){
        roles = roles+zeilen[index_role]
      }else{
        found = false;
      }
      index_role++;
    }

    return roles;
  }

  getRoleNames(roles){

    roles=roles.match(/[A-Z,_]{3,}/g);
    console.log(roles);

    roles=roles+"test";
    return roles;
  }

  onChange(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {

      this.fileOutput = e.target.result;

      let zeilen = this.fileOutput.split("\n");

      // String wird gesplittete und startet nun beim ersten @ Zeichen

      let apioperation = false


      // Löschen von unnötigen Zeilen
      let index_delete =0;
      for(let zeile of zeilen) {
        if(zeile.search("@ApiResponse") !== -1){
          zeilen.splice(index_delete,1);
        }
        if(zeile.search("@ApiResponses") !== -1){
          zeilen.splice(index_delete,1);
        }

        index_delete++;
      }

// Zeilen analysieren

      let i_analyze=0;

      for(let zeile of zeilen){

        //Bedingungen

        if (zeile.search("@PreAuthorize") !== -1) {
          let roles = this.getRoles(i_analyze, zeilen)
          let role_names = this.getRoleNames(roles)
          this.result.push(role_names)
          this.result2.push("Rollen")
        }else if (zeile.search("@ApiOperation") !== -1){
          zeile = zeile.substring(zeile.search("@ApiOperation"));
          let splitted = zeile.split("\"");
          splitted = splitted[1] + "\"";
          console.log(splitted);
          this.result.push(splitted);
          apioperation = true;
          this.result2.push("ApiOperation")
        }else if (zeile.search("@GetMapping")>-1 || zeile.search("@PatchMapping")>-1 || zeile.search("@PostMapping")>-1 || zeile.search("@PutMapping")>-1 || zeile.search("@DeleteMapping")>1) {
          let splitted = zeile.split("\"");
          splitted = splitted[1] + "\"";
          console.log(splitted)
          let name = zeile.split("(");
          name = name[0]
          this.result.push(splitted);
          this.result2.push("Pfad" + name)
        }else{
           console.log("Annotation entspricht nicht Fall 1-5");
           //if(apioperation == true){
              // let leer = " \n";
             //this.result.push(leer);
             apioperation=false;
           //}

        }
        i_analyze++;
      }
    };

    reader.readAsText(file);

  }
  headers = ["Beschreibung"];
  rows = this.result;

}
