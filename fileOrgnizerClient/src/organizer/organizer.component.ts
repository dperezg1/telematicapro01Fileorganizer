import {Component, OnInit} from '@angular/core';
import {File} from '../modelos/file';
import {PersonService} from '../app/services/person.service';
import {Router} from '@angular/router';
import {FileService} from '../app/services/file.service';


@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['../css/bootstrap.min.css', '../css/estilos.css'],
  providers:[PersonService]
})
export class OrganizerComponent implements OnInit{
  title = 'Let\'s Hear it';
  public files :File[];


  constructor(private personService:PersonService,private fileService:FileService, private router:Router){
    this.getMyFiles();
  }

  ngOnInit(){
    this.getMyFiles();
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

  gotoCreateFile():void{
    let link = ["/createFile"];
    this.router.navigate(link);
  }

  getMyFiles():void{
    this.personService.getLogUserInfo().then(res=>{
      let username = JSON.parse(res._body).username;
      this.fileService.getMyFiles(username).then(res=>{
        this.files = res;
      })
    })
  }

  editFile(id:string):void{
    this.router.navigate(['/editFile',id]);

  }

  deleteFile(id:string):void{
    if(confirm("Do you want to delete the file?")){
      console.log("true");
      this.fileService.deleteFile(id).then(res=>{
        console.log(res);
        if(res.status.toString().indexOf("200")!=-1){
          console.log("entre a este");
          this.personService.getLogUserInfo().then(res=>{
            let username = JSON.parse(res._body).username;
            this.fileService.getMyFiles(username).then(res=>{
              this.files = res;
            })
          }) 


        }
      })
    }else{console.log("false")}
  }

  gotoShare(id:string):void{
    let link = ["/shareFile"];
    this.router.navigate(['/shareFile',id]);
  }

searchFileByTitle(title:string):void{
    this.personService.getLogUserInfo().then(res=>{
      let username = JSON.parse(res._body).username;
      this.fileService.searchFileByTitle(title,username).then(res=>{
        this.files = res;

      })
    })
  }





}
