import { Component } from '@angular/core';
import {Person} from '../modelos/person';
import { Router }            from '@angular/router';
import {PersonService} from '../app/services/person.service';
import {FileService} from '../app/services/file.service';


@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['../css/bootstrap.min.css', '../css/estilos.css'],
  providers:[PersonService,FileService]
})
export class LoginComponent {
  title = 'Let\'s Hear it';


  constructor(private personService:PersonService, private router:Router){


  }

  signIn(username:string, password:string):void{
    this.personService.loginUser(username,password).then(res =>{
      console.log(res);
      if(res.status.toString().indexOf("200")!=-1){
        this.gotoOrganizer();

      }else{

        document.getElementById("username").style.borderColor = "red";
        document.getElementById("password").style.borderColor = "red"
        document.getElementById("exist").style.display = "block"
      }
    })



  }

  gotoOrganizer():void{
    let link = ["/app-organizer"];
    this.router.navigate(link);
  }





}
