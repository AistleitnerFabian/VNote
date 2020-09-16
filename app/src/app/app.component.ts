import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './data.service';
import { NavigationBarPlugin } from 'capacitor-navigationbar';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { Plugins } from '@capacitor/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  NavigationBar: NavigationBarPlugin;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public dataService: DataService,
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();
  }

  toogleDarkmode(){
    this.NavigationBar = Plugins.NavigationBar as NavigationBarPlugin;
    this.dataService.darkmode = !this.dataService.darkmode
    this.NavigationBar.setBackgroundColor({color: this.dataService.darkmode ? 'black' : 'white'});
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // set to landscape
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
