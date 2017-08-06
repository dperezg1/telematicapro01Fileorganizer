import {Component, OnInit} from '@angular/core';
import {File} from '../modelos/file';
import {FileService} from '../app/services/file.service';
import {PersonService} from '../app/services/person.service';
import {Router} from '@angular/router';


@Component({
  selector: 'organizerSharedMe',
  templateUrl: './organizerSharedMe.html',
  styleUrls: ['../css/bootstrap.min.css', '../css/estilos.css'],
  providers:[FileService,PersonService]
})
export class OrganizerSharedMeComponent implements OnInit{
  title = 'Let\'s Hear it';
  public files:File[];

constructor(private fileService:FileService,private personService:PersonService,private router:Router){}

ngOnInit(){
  this.getFilesSharedWithMe()
}

  getFilesSharedWithMe():void{
    this.personService.getLogUserInfo().then(res=>{
      let username = JSON.parse(res._body).username;
      this.fileService.getFilesSharedWithMe(username).then(res=>{
        this.files = res;
      })
    })
  }

  logout():void{
    this.personService.logoutUser().then(res=>{
      console.log(res);
      if(res.status.toString().indexOf("200")!=-1){
        this.gotoHome();
      }
    })
  }

  gotoHome():void{
    let link = ["/home"];
    this.router.navigate(link);
  }
}


