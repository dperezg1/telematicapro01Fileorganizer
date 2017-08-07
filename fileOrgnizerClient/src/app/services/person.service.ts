import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Person } from '../../modelos/person';

@Injectable()
export class PersonService {
  private headers = new Headers({"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"});
  private passheaders = new Headers({"Access-Control-Allow-Origin": "http://localhost:3000","Access-Control-Allow-Credentials": "true", "Content-Type": "application/x-www-form-urlencoded"});


  private userUrl = 'http://localhost:3000';

  constructor(private http: Http) {
  }

  createUser(username: string, password: string):Promise<any>
  {
    let url= this.userUrl+"/signup";
    let data=new URLSearchParams();
    data.append('username', username);
    data.append('password', password);
    return this.http.post(url,data,{headers: this.passheaders,withCredentials:true})
      .toPromise()
      .then(res => res as any, res=> res as any)
      .catch(this.handleError)
  }

  logoutUser():Promise<any>
  {
    let url= this.userUrl+"/logout";
    return this.http.get(url, {headers: this.passheaders, withCredentials: true} )
      .toPromise()
      .then(res => res as any, res=> res as any)
      .catch(this.handleError)
  }

  getLogUserInfo():Promise<any>
  {
    let url= this.userUrl+"/userInfo";
    return this.http.get(url, {headers: this.passheaders, withCredentials: true})
      .toPromise()
      .then(res => res as any, res=> res as any)
      .catch(this.handleError)
  }


  loginUser(username: string, password: string):Promise<any>
  {
    let url= this.userUrl+"/login";
    let data= new URLSearchParams();
    data.append('username', username);
    data.append('password', password);
    return this.http.post(url,data,{ headers: this.passheaders, withCredentials:true})
      .toPromise()
      .then(res=> res as any, res=> res as any)
      .catch(this.handleError)
  }


  deleteUser(username: string): Promise<void>{
    let url = this.userUrl + "/userDelete";
    return this.http.post(url,JSON.stringify({username: username}) ,{headers: this.headers})
      .toPromise()
      .then(()=>null)
      .catch(this.handleError)
  }

  searchUser(username : string): Promise<any> {
    let url = this.userUrl + "/searchUser" ;
    return this.http.post(url,JSON.stringify({username:username}), {headers: this.headers})
      .toPromise()
      .then(res=> res as any)
      .catch(this.handleError)
  }

  updateUser(username: string, password: string): Promise<any> {
    return this.http.post(this.userUrl+ "/updateUser", JSON.stringify({username: username,password:password}), {headers: this.headers})
      .toPromise()
      .then(res => res as any )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
