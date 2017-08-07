
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizerComponent } from '../organizer/organizer.component';
import {LoginComponent} from '../login/login';
import {SignupComponent} from '../signup/signup';
import {ModifyAccountComponent} from '../modifyAccount/modifyAccount';
import {OrganizerSharedMeComponent} from '../organizerSharedMe/organizerSharedMe';
import {HomeComponent} from '../home/home';
import {EditFileComponent} from '../editFile/editFile';
import {CreateFileComponent} from '../createFile/createFile';
import {ShareFileComponent} from '../shareFile/shareFile';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'app-organizer',  component: OrganizerComponent },
  { path: 'login',  component: LoginComponent },
 { path: 'signup',  component: SignupComponent },
  { path: 'modifyAccount', component: ModifyAccountComponent },
  { path: 'organizerSharedMe',     component: OrganizerSharedMeComponent },
  { path: 'home',     component: HomeComponent },
  { path: 'editFile/:id',     component: EditFileComponent },
  { path: 'createFile',     component: CreateFileComponent },
  { path: 'shareFile/:id',  component: ShareFileComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
