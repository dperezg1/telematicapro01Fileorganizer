import { Component } from '@angular/core';
import { Router }            from '@angular/router';
import {PersonService} from '../app/services/person.service';
import {FileService} from '../app/services/file.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.html',
  styleUrls: ['../css/bootstrap.min.css', '../css/estilos.css'],
  providers:[PersonService,FileService]
})
export class SignupComponent {
  title = 'Let\'s Hear it';

  constructor(private personService:PersonService,private router: Router){}

  createUser(username:string,password:string):void{
    if(username.length !=0 && password.length!=0) {
      this.personService.createUser(username, password).then(res => {
        if (res.status.toString().indexOf("200") != -1) {
          this.gotoOrganizer();
        } else {
          document.getElementById("username").style.borderColor = "red"
          document.getElementById("exist").style.display = "block"
          document.getElementById("alert").style.display = "none"
        }
      })
    }else{
      if(username.length ==0) {
        document.getElementById("username").style.borderColor = "red"
        document.getElementById("alert").style.display = "block"
        document.getElementById("exist").style.display = "none"
      }
      if(password.length==0){
        document.getElementById("password").style.borderColor = "red"
        document.getElementById("alert").style.display = "block"
        document.getElementById("exist").style.display = "none"
      }
    }
  }


    gotoOrganizer():void{
      let link = ["/app-organizer"];
    this.router.navigate(link);

  }

}
