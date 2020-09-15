import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

import { ToastController } from '@ionic/angular';

const { CameraPreview } = Plugins;
import { CameraPreviewOptions } from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  constructor(public toastController: ToastController) {
  }

  ngOnInit() {
  }

  cameraOn() {
    this.toast();
    this.takePicture();
  }

  async toast() {
    const toast = await this.toastController.create({
      message: 'Camera On',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }


  async takePicture() {
    var cameraPreviewOptions: CameraPreviewOptions = {
      height: window.screen.height,
      width: window.screen.width,
      x: 0,
      y: 0,
      toBack: true,
    };
    CameraPreview.start(cameraPreviewOptions);
  }
}
