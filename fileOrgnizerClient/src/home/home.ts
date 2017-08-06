import {Component, OnInit} from '@angular/core';
import {File} from '../modelos/file';
import {Router} from '@angular/router';
import {FileService} from '../app/services/file.service';
import {PersonService} from '../app/services/person.service';


@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['../css/bootstrap.min.css', '../css/estilos.css']
})
export class HomeComponent implements OnInit{
  title = 'Let\'s Hear it';
  public files:File[];

constructor(private router:Router,private fileService:FileService,private personService:PersonService){}

  ngOnInit(){
    this.getPublicFiles();
  }

  getPublicFiles():void{
      this.fileService.getAllFiles().then(res=>{
        this.files = res;
      })

  }
  gotoSignIn():void{
    let link = ["/login"];
    this.router.navigate(link);
  }

}
