import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

import { ToastController } from '@ionic/angular';

const { CameraPreview } = Plugins;
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import { MenuController } from '@ionic/angular';
import { DataService } from '../data.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  isCameraOn: boolean = false;
  showPhotoPreview: boolean = false;
  imageData: string;
  isPhotoFromLibrary: boolean = false;
  constructor(public toastController: ToastController, public menuController: MenuController, public dataService: DataService) {
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
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
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
    this.imageData = ""
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 100
    };
    this.showPhotoPreview = true;
    try {
      const result = await CameraPreview.capture(cameraPreviewPictureOptions);
      const base64PictureData = result.value;
      if (base64PictureData != "" && base64PictureData != null) {
        this.imageData = "url('data:image/png;base64," + base64PictureData + "')"
      } else {
        this.discardImage();
      }
    } catch (e) {
      this.isCameraOn = false;
      CameraPreview.stop().then(()=>{
        CameraPreview.start(this.cameraPreviewOptions);
        this.discardImage();
        this.isCameraOn = true;
      })
    }
  }

  async selectFromGallery() {
    this.isPhotoFromLibrary = true;
    this.showPhotoPreview = true;
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    }).then((image)=>{
      if (image.base64String  != "" && image.base64String != null) {
        this.imageData = "url('data:image/png;base64," + image.base64String + "')"
      } else {
        this.discardImage();
      }
    });
    
  }

  uploadImage() {
    this.toast("Image Uploaded")
  }

  discardImage() {
    this.imageData = ""
    this.showPhotoPreview = false;
  }

}
