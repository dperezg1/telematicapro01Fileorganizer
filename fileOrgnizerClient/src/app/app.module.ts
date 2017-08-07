import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {OrganizerComponent} from '../organizer/organizer.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from '../login/login';
import {SignupComponent} from '../signup/signup';
import {ModifyAccountComponent} from '../modifyAccount/modifyAccount';
import {OrganizerSharedMeComponent} from '../organizerSharedMe/organizerSharedMe';
import {HomeComponent} from '../home/home';
import {EditFileComponent} from '../editFile/editFile';
import {CreateFileComponent} from '../createFile/createFile';
import {ShareFileComponent} from '../shareFile/shareFile';
import {PersonService} from './services/person.service';
import {FileService} from './services/file.service';
import {CustExtBrowserXhr} from './cust-ext-browser-xhr';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    OrganizerComponent,
    LoginComponent,
    SignupComponent,
    ModifyAccountComponent,
    OrganizerSharedMeComponent,
    HomeComponent,
    EditFileComponent,
    CreateFileComponent,
    ShareFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [PersonService,FileService,CustExtBrowserXhr],
  bootstrap: [AppComponent]
})
export class AppModule { }
