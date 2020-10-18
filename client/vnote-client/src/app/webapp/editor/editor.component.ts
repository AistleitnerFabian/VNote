import {AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PanZoomConfig, PanZoomAPI, PanZoomModel} from 'ngx-panzoom';
import {Subscription} from 'rxjs';
import {DragAndDropService} from "./drag-and-drop.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {

  panZoomConfig: PanZoomConfig;
  private panZoomAPI: PanZoomAPI;
  private apiSubscription: Subscription;
  private modelChangedSubscription: Subscription;
  gridSize = 150;
  @ViewChild('grid') grid;
  @ViewChild('panzoom') panzoom;


  constructor(private dragAndDropService: DragAndDropService) {
    this.panZoomConfig = new PanZoomConfig();
    this.panZoomConfig.zoomLevels = 20;
    this.panZoomConfig.neutralZoomLevel = 15;
    this.panZoomConfig.initialZoomLevel = 10;
    this.panZoomConfig.scalePerZoomLevel = 1.1;
    this.panZoomConfig.freeMouseWheel = true;
    this.panZoomConfig.freeMouseWheelFactor = 0.001;
    this.panZoomConfig.zoomOnDoubleClick = false;
    this.panZoomConfig.noDragFromElementClass = 'noDrag';
  }

  ngOnInit(): void {
    this.apiSubscription = this.panZoomConfig.api.subscribe((api: PanZoomAPI) => this.panZoomAPI = api);
    this.modelChangedSubscription = this.panZoomConfig.modelChanged.subscribe((model: PanZoomModel) => this.onModelChanged(model));
  }

  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();  // don't forget to unsubscribe.  you don't want a memory leak!
    this.modelChangedSubscription.unsubscribe();  // don't forget to unsubscribe.  you don't want a memory leak!
  }

  ngAfterViewInit(): void {
    this.grid.nativeElement.style.backgroundSize = this.panzoom.scale * this.gridSize + 'px';
  }

  zoomTo(): void {
    try {
      //this.panZoomAPI.panDelta();
    } catch (e) {
    }
  }

  onModelChanged(model: PanZoomModel): void {
    if (this.grid !== undefined) {
      this.grid.nativeElement.style.backgroundPositionX = model.pan.x + 'px';
      this.grid.nativeElement.style.backgroundPositionY = model.pan.y + 'px';
      this.grid.nativeElement.style.backgroundSize = this.panzoom.scale * this.gridSize + 'px';
    }
  }


  @HostListener('mouseup')
  onMouseup() {
    this.dragAndDropService.isDraging = false;
    this.dragAndDropService.dragHandler = null;
  }


  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    console.log(event)
    if (event.target.id === 'dragHandle') {
      this.dragAndDropService.scale = this.panzoom.scale;
      this.dragAndDropService.dragHandler = event.target;
      this.dragAndDropService.isDraging = true;
      this.dragAndDropService.dragX = event.x;
      this.dragAndDropService.dragY = event.y;
    }
  }
}
