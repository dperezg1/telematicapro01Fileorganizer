import {Component, OnInit} from '@angular/core';
import {File} from '../modelos/file';
import {PersonService} from '../app/services/person.service';
import {FileService} from '../app/services/file.service';
import {Router} from '@angular/router';


@Component({
  selector: 'modifyAccount',
  templateUrl: './modifyAccount.html',
  styleUrls: ['../css/bootstrap.min.css', '../css/estilos.css'],
  providers:[PersonService,FileService]
})

export class ModifyAccountComponent implements OnInit{

  constructor(private personService:PersonService, private router:Router){}
  ngOnInit(){
    this.personService.getLogUserInfo().then(res=>{
      let username = JSON.parse(res._body).username;
      (<HTMLInputElement>document.getElementById("username")).value=username;
    })

  }

  saveChange(currentPassword:string,newPassword:string):void{
    this.personService.getLogUserInfo().then(res=>{
      let currentPassword2 = JSON.parse(res._body).password;
      let username = JSON.parse(res._body).username;
      console.log(currentPassword2 + "vieja " + currentPassword);
      if(currentPassword == currentPassword2){
        this.personService.updateUser(username,newPassword).then(res =>{
          console.log(res);
          if(res.status.toString().indexOf("200")!=-1){
            alert("change successful");
            this.gotoOrganizer();
          }
        })
      }else{
        console.log("las claves son diferentes");
      }
    })
  }

  gotoOrganizer():void{
    let link = ["/app-organizer"];
    this.router.navigate(link);
  }

deleteAccount():void {
    if(confirm("Do you want to delete the Account?")) {
      this.personService.getLogUserInfo().then(res => {
        let username = JSON.parse(res._body).username;
        this.personService.deleteAccount(username).then(res => {
          if(res.status.toString().indexOf("200")!=-1){
            this.gotoHome();
          }
        })
      })
    }
  }

  gotoHome():void{
    let link = ["/home"];
    this.router.navigate(link);
  }





}
