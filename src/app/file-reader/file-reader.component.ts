import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css']
})
export class FileReaderComponent {
  fileOutput;
  result = new Array();
  ersteZeile;
  //leer;
  onChange(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {

      this.fileOutput = e.target.result;

      let zeilen = this.fileOutput.split("\n");
      let zeilenanzahl = zeilen.length;

      // String wird gesplittete und startet nun beim ersten @ Zeichen
      let i =0;
      for(let zeile of zeilen){
        i++;
        //console.log("zeilennummer:", i)
        //console.log("Sucherergebnis search:",zeile.search("@PostMapping") )
        if(zeile.search("@ApiOperation") !== -1){
          zeile = zeile.substring(zeile.search("@ApiOperation"));
          let splitted = zeile.split("\"");
          splitted = splitted[1] + "\"";
          console.log(splitted);
          this.result.push(splitted);
        }else if (zeile.search("@GetMapping")>-1 || zeile.search("@PatchMapping")>-1 || zeile.search("@PostMapping")>-1 || zeile.search("@PutMapping")>-1 || zeile.search("@DeleteMapping")>1) {
          //this.result.push(zeile);
          let splitted = zeile.split("\"");
          splitted = splitted[1] + "\"";
          console.log(splitted);
          this.result.push(splitted);
          //Stefan fragen wie man Anführungsstriche löscht
          /*this.result.forEach((element,index)=>{
            if(element=="\"") delete this.result[index];
          });*/
        }else{
           console.log("Annotation entspricht nicht Fall 1-5");
           let leer = "\n";
           this.result.push(leer);
        }
      }
      //console.log(this.result);
    };

    reader.readAsText(file);

  }
  headers = ["@-Zeilen"];
  rows = this.result;

}
