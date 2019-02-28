import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ReactiveFormsModule} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {AppRoutingModule} from './routes/app-routing.module';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataBaseService} from './services/db/dataBase.service';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { MainComponent } from './components/main/main.component';
import { TeamComponent } from './components/team/team.component';
import { TeammateComponent } from './components/teammate/teammate.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyC8yPo-8WJqrU_amDuDv8f3d-1zh2tGSkE',
  authDomain: 'g-hashcode.firebaseapp.com',
  databaseURL: 'https://g-hashcode.firebaseio.com',
  projectId: 'g-hashcode',
  storageBucket: 'g-hashcode.appspot.com',
  messagingSenderId: '324132902070'
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    TeamComponent,
    TeammateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    DataBaseService,
    Title
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
