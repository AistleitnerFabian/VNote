import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ImageDataDTO} from '../../model/imageDataDTO';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  private imageSrc = '';

  constructor(private httpService: HttpService, private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onFileChanged(e): void {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e): void {
    const reader = e.target;
    this.imageSrc = reader.result;
  }

  onUpload(): void {
    const image = new Image();

    image.src = this.imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      console.log(canvas.toDataURL());
      const base64 = canvas.toDataURL().split(',')[1];
      const imageDataDTO = new ImageDataDTO();
      imageDataDTO.base64Image = base64;
      imageDataDTO.user = this.dataService.authenticatedUser;
      this.httpService.uploadImage(imageDataDTO).subscribe();
    };

  }
}
