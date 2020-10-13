
import '@capacitor-community/camera-preview';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import {HTTP} from '@ionic-native/http/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataService,
    ScreenOrientation,
    ImagePicker,
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
