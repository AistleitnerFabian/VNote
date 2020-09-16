import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

import { ToastController } from '@ionic/angular';

const { CameraPreview } = Plugins;
import { CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  isCameraOn: boolean = false;
  constructor(public toastController: ToastController, public menuController: MenuController) {
  }

  ngOnInit() {
    this.cameraOn();
  }

  async toast() {
    const toast = await this.toastController.create({
      message: 'Photo',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  openMenu(){
    this.menuController.enable(true, 'first');
    this.menuController.open('first');
  }

  async cameraOn() {
    var cameraPreviewOptions: CameraPreviewOptions = {
      height: window.screen.height,
      width: window.screen.width,
      x: 0,
      y: 0,
      toBack: true,
    };
    CameraPreview.start(cameraPreviewOptions);
    this.isCameraOn = true;
  }

  async takePhoto() {
    this.toast();
  }
}
