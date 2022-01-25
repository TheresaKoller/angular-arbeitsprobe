import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css']
  
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export interface PeriodicElement {
  result: string;
  result2: string;
}

export class FileReaderComponent {
  fileOutput;
  result = new Array();
result2 = new Array();
  expandedElement: PeriodicElement;
  getRoleNames(roles){

    //roles=roles.match(/[A-Z,_]{3,}/);
    console.log(roles.match(/[A-Z,_]{3,}/g));
    roles=roles+"test";
    return roles;
  }

  getRoles(index_role, zeilen){
    let roles = zeilen[index_role];
    console.log(roles)
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
          this.result2.push("Rollen:");
          this.result.push(roles)
        }
        if(zeile.search("@ApiOperation") !== -1){
          zeile = zeile.substring(zeile.search("@ApiOperation"));
          let splitted = zeile.split("\"");
          splitted = splitted[1] + "\"";
          console.log(splitted);
          this.result.push(splitted);
          this.result2.push("ApiOperation");
          apioperation = true;
        }else if (zeile.search("@GetMapping")>-1 || zeile.search("@PatchMapping")>-1 || zeile.search("@PostMapping")>-1 || zeile.search("@PutMapping")>-1 || zeile.search("@DeleteMapping")>1) {
          //this.result.push(zeile);
          let splitted = zeile.split("\"");
          splitted = splitted[1] + "\"";
          console.log(splitted);
          this.result.push(splitted);
          this.result2.push("***Mapping");
        }else{
           console.log("Annotation entspricht nicht Fall 1-5");
           if(apioperation == true){
               let leer = " \n";
             this.result.push(leer);
             this.result2.push(leer);
             apioperation=false;
           }

        }
        i_analyze++;
      }
    };

    reader.readAsText(file);

  }
  headers = ["@-Zeilen"];
  rows = this.result;

}
