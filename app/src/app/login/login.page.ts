import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {AlertController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {imageDataDTO} from '../home/imageDataDTO';
import {User} from '../user';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    @Input()
    loginUser: User = new User();

    constructor(public dataService: DataService,
                public alertController: AlertController,
                private http: HttpClient,
                private router: Router,) {
    }

    ngOnInit() {
        this.presentAlertPrompt();
    }

    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            header: 'Server-IP:',
            inputs: [
                {
                    name: 'serverip',
                    type: 'text',
                    placeholder: ''
                }
            ],
            buttons: [
                {
                    text: 'Ok',
                    handler: (alertData) => {
                        this.dataService.serverIP = alertData.serverip;
                    }
                }
            ]
        });

        await alert.present();
    }

    login() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        this.http.post<User>('http://' + this.dataService.serverIP + '/api/login', this.loginUser, httpOptions).subscribe(data => {
            if (data != null) {
                this.dataService.loggedInUser = data;
                this.router.navigateByUrl('/home');
                this.dataService.loggedIn = true;
            }
        });
    }
}
