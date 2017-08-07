import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FileService} from '../app/services/file.service';
import {PersonService} from '../app/services/person.service';
import {File} from '../modelos/file'

@Component({
  selector: 'createFile',
  templateUrl: './createFile.html',
  styleUrls: ['../css/bootstrap.min.css', '../css/estilos.css']
})
export class CreateFileComponent {
  title = 'Let\'s Hear it';


  constructor(private fileService:FileService, private personService:PersonService, private router:Router){

  }

  createFile(title:string,type:string,size:string,year:string,visibility:string):void{
    this.personService.getLogUserInfo().then(res=>{
      let username = JSON.parse(res._body).username;
      console.log(JSON.parse(res._body).username);
      let file = new File();
      file = {
        title:title,
        type:type,
        _id:"",
        size:size,
        owner_username:username,
        year:year,
        visibility:visibility,
        sharedWith:[]
      }
      console.log(file);
      this.fileService.createFile(file).then(res=>{
        if(res.status.toString().indexOf("200")!=-1){
          this.gotoOrganizer();
        }else{
          console.log("archivo no creado");
        }
      })
    })
  }

  gotoOrganizer():void{
    let link = ["/app-organizer"];
    this.router.navigate(link);

  }


}
