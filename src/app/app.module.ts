import { TabsPage } from './page/menu/tabs/tabs.page';
import { SidemenuPage } from './page/menu/sidemenu/sidemenu.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ContactPage } from './page/contact/contact.page';
//var app = angular.module('Codetribe-task01', ['mapboxgl-directive']);
@NgModule({
  declarations: [AppComponent, SidemenuPage, TabsPage,ContactPage],
  entryComponents: [],
  exports: [
    FormsModule, ReactiveFormsModule,
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),   AngularFirestoreModule.enablePersistence(),   
    AngularFireAuthModule, FormsModule, ReactiveFormsModule,
    
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
 
  ],
  providers: [
    StatusBar,
    SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
