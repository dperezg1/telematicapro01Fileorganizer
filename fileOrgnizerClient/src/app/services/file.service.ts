import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { File } from '../../modelos/file';

@Injectable()
export class FileService {
  private headers = new Headers({"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"});
  private fileUrl = 'http://localhost:3000';
  constructor(private http: Http) {
  }


  createFile(file: File): Promise<any> {
    return this.http.post(this.fileUrl+ "/file", JSON.stringify(file), {headers: this.headers})
      .toPromise()
      .then(res => res as any )
      .catch(this.handleError);
  }

  deleteFile(id: string): Promise<any>{
    let url = this.fileUrl + "/deleteFile";
    return this.http.post(url,JSON.stringify({_id:id}) ,{headers: this.headers})
      .toPromise()
      .then(res => res as any)
      .catch(this.handleError)
  }

  getAllFiles(): Promise<File[]> {
    return this.http.get(this.fileUrl + "/file")
      .toPromise()
      .then(courses => courses.json() as File[])
      .catch(this.handleError);
  }


  getMyFiles(username : string): Promise<File[]> {
    let url = this.fileUrl + "/getFiles";
    return this.http.post(url,JSON.stringify({username:username}) ,{headers: this.headers})
      .toPromise()
      .then(res=> res.json() as File[])
      .catch(this.handleError)
  }

  getFilesSharedWithMe(username : string): Promise<File[]> {
    let url = this.fileUrl + "/sharedWithMe";
    return this.http.post(url,JSON.stringify({username:username}) ,{headers: this.headers})
      .toPromise()
      .then(res=> res.json() as File[])
      .catch(this.handleError)
  }

  shareFileWith(_id: string, username: string): Promise<any> {
    return this.http.post(this.fileUrl+ "/shareFileWith", JSON.stringify({_id:_id,username: username}), {headers: this.headers})
      .toPromise()
      .then(res => res as any )
      .catch(this.handleError);
  }

  updateFile(title: string,type:string, size: string,visibility:string,_id:string): Promise<any> {
    return this.http.post(this.fileUrl+ "/updateFile", JSON.stringify({_id:_id,title:title,type:type,size:size,visibility:visibility}), {headers: this.headers})
      .toPromise()
      .then(res => res as any )
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
