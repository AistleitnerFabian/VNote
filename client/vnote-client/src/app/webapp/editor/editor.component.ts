import {Component, OnInit} from '@angular/core';
import {PanZoomConfig} from "ngx-panzoom";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  panZoomConfig: PanZoomConfig;

  constructor() {
    this.panZoomConfig = new PanZoomConfig();
    this.panZoomConfig.zoomLevels = 20;
    this.panZoomConfig.neutralZoomLevel = 15;
    this.panZoomConfig.initialZoomLevel = 10;
    this.panZoomConfig.scalePerZoomLevel = 1.1;
    this.panZoomConfig.freeMouseWheel = true;
    this.panZoomConfig.freeMouseWheelFactor = 0.001;
    this.panZoomConfig.zoomOnDoubleClick = false;
  }

  ngOnInit(): void {
  }

}
