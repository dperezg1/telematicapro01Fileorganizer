import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../app/services/person.service';
import {FileService} from '../app/services/file.service';

@Component({
  selector: 'editFile',
  templateUrl: './editFile.html',
  styleUrls: ['../css/bootstrap.min.css', '../css/estilos.css'],
  providers:[PersonService,FileService]
})
export class EditFileComponent implements  OnInit{
  title = 'Let\'s Hear it';
  id:string
  private sub: any;

  constructor(private router:ActivatedRoute, private fileService: FileService,private router2:Router){


  }

  ngOnInit(){
    this.sub = this.router.params.subscribe(params =>{
    this.id = params['id'];
    console.log(this.id);
      this.fileService.searchFile(this.id).then(res=>{
        console.log(res[0].owner_username);

        (<HTMLInputElement>document.getElementById("firstname")).value=res[0].title;
        (<HTMLInputElement>document.getElementById("lastname")).value=res[0].type;
        (<HTMLInputElement>document.getElementById("size")).value=res[0].size;
        (<HTMLInputElement>document.getElementById("visibility")).value=res[0].visibility;
        (<HTMLInputElement>document.getElementById("year")).value=res[0].year;
      })

    })


  }


  saveChanges(title:string,type:string,size:string,visibility:string,year:string):void{
    this.fileService.updateFile(title, type,size,visibility,this.id).then(res=>{
      if(res.status.toString().indexOf("200")!= -1){
         this.gotoOrganizer();
      }
    })

  }

  gotoOrganizer():void{
    let link = ["/app-organizer"];
    this.router2.navigate(link);
  }



}
