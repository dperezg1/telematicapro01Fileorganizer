import {Component, OnInit} from '@angular/core';
import {PersonService} from '../app/services/person.service';
import {FileService} from '../app/services/file.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'shareFile',
  templateUrl: './shareFile.html',
  styleUrls: ['../css/bootstrap.min.css', '../css/estilos.css'],
  providers:[PersonService,FileService]
})
export class ShareFileComponent implements OnInit{
  title = 'Let\'s Hear it';

  id:string;
  private sub: any;
  constructor(private router:ActivatedRoute, private fileService: FileService,private personService:PersonService,private router2:Router){}


  ngOnInit(){
    this.sub = this.router.params.subscribe(params =>{
      this.id = params['id'];
    })
  }

    shareFile(username:string):void{
    this.personService.searchUser(username).then(res=>{
		console.log(username);
		console.log(res);
      if(res._body.toString().indexOf("true")!=-1){
        this.fileService.shareFileWith(this.id,username).then(res=>{
          if(res.status.toString().indexOf("200")!=-1){
            this.gotoOrganizer();
          }else{
            console.log("lo estoy haciendo mal")
          }
        })
      }else{

        document.getElementById("username").style.borderColor = "red";
        document.getElementById("exist").style.display = "block"
      }
    })
  }

  gotoOrganizer():void{
    let link = ["/app-organizer"];
    this.router2.navigate(link);
  }

}
