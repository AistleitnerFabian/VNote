import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {DataService} from './data.service';
import {NavigationBarPlugin} from 'capacitor-navigationbar';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

import {Plugins, Toast} from '@capacitor/core';
import {Router} from "@angular/router";
import {User} from "./user";

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
        private screenOrientation: ScreenOrientation,
        private router: Router
    ) {
        this.initializeApp();
    }

    toogleDarkmode() {
        this.NavigationBar = Plugins.NavigationBar as NavigationBarPlugin;
        this.dataService.darkmode = !this.dataService.darkmode
        this.NavigationBar.setBackgroundColor({color: this.dataService.darkmode ? 'black' : 'white'});
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // set to PORTRAIT
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    logout() {
        this.router.navigateByUrl('/login');
        this.dataService.loggedIn = false;
        this.dataService.loggedInUser = new User();
    }
}
