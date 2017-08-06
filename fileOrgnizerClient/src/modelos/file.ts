import {SharedPerson} from './sharedPerson'

export class File{

  title:string;
  type:string;
  _id:string;
  size:string;
  owner_username:string;
  year:string;
  visibility:string;
  sharedWith:SharedPerson[];


}
