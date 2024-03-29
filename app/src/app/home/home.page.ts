import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {Plugins, CameraResultType, CameraSource} from '@capacitor/core';

const {Camera} = Plugins;

import {ToastController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';

const {CameraPreview, Motion} = Plugins;
import {CameraPreviewOptions, CameraPreviewPictureOptions} from '@capacitor-community/camera-preview';
import {MenuController} from '@ionic/angular';
import {DataService} from '../data.service';
import {imageDataDTO} from './imageDataDTO';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
    isCameraOn = false;
    showPhotoPreview = false;
    imageData: string;
    imageBase64: string;
    isPhotoFromLibrary = false;

    constructor(public toastController: ToastController,
                public menuController: MenuController,
                public dataService: DataService,
                public alertController: AlertController,
                private http: HttpClient) {
    }

    cameraPreviewOptions: CameraPreviewOptions = {
        height: window.screen.height,
        width: window.screen.width,
        x: 0,
        y: 0,
        toBack: true,
    };

    ngOnInit() {
        this.cameraOn();
        this.menuController.enable(true, 'first');
    }

    async toast(message) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
            position: 'top',
        });
        await toast.present();
    }

    openMenu() {
        this.menuController.open('first');
    }

    async cameraOn() {
        CameraPreview.start(this.cameraPreviewOptions);
        this.isCameraOn = true;
    }

    async takePhoto() {
        this.isPhotoFromLibrary = false;
        this.imageData = '';
        const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
            quality: 100
        };
        this.showPhotoPreview = true;
        try {
            const result = await CameraPreview.capture(cameraPreviewPictureOptions);
            const base64PictureData = result.value.toString();
            if (base64PictureData != '' && base64PictureData != null) {
                this.imageBase64 = base64PictureData;
                this.imageData = 'url(\'data:image/png;base64,' + base64PictureData + '\')';
            } else {
                this.discardImage();
            }
        } catch (e) {
            this.isCameraOn = false;
            CameraPreview.stop().then(() => {
                CameraPreview.start(this.cameraPreviewOptions);
                this.discardImage();
                this.isCameraOn = true;
            });
        }
    }

    async selectFromGallery() {
        this.isPhotoFromLibrary = true;
        this.showPhotoPreview = true;
        const image = await Camera.getPhoto({
            quality: 100,
            resultType: CameraResultType.Base64,
            source: CameraSource.Photos
        }).then((image) => {
            if (image.base64String != '' && image.base64String != null) {
                this.imageBase64 = image.base64String;
                this.imageData = 'url(\'data:image/png;base64,' + image.base64String + '\')';
            } else {
                this.discardImage();
            }
        });

    }

    uploadImage() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        const postData: imageDataDTO = new imageDataDTO(this.imageBase64, this.dataService.loggedInUser);
        this.http.post<imageDataDTO>('http://' + this.dataService.serverIP + '/api/uploadImage', postData, httpOptions).subscribe(data => {
            console.log(data);
        });
    }

    discardImage() {
        this.imageData = '';
        this.showPhotoPreview = false;
    }

    ngOnDestroy() {
        CameraPreview.stop();
    }
}
