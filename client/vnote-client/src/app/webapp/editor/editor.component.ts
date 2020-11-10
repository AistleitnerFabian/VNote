import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  setTestabilityGetter,
  ViewChild
} from '@angular/core';
import {PanZoomConfig, PanZoomAPI, PanZoomModel} from 'ngx-panzoom';
import {Subscription} from 'rxjs';
import {DragAndDropService} from './drag-and-drop.service';
import {Note} from '../model/note';
import {animate, style, transition, trigger} from '@angular/animations';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../http.service';
import {Board} from '../model/board';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {

  panZoomConfig: PanZoomConfig;
  private panZoomAPI: PanZoomAPI;
  private apiSubscription: Subscription;
  private modelChangedSubscription: Subscription;
  private routeSubscription: Subscription;
  gridSize = 150;
  @ViewChild('grid') grid;
  @ViewChild('panzoom') panzoom;
  board: Board;
  gridVisible = true;
  focused = {x: null, y: null};
  private boardSubscription: Subscription;

  constructor(private dragAndDropService: DragAndDropService, private dataService: DataService,
              private route: ActivatedRoute, private httpService: HttpService) {
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
    this.dataService.isEditorOpen = true;
    this.checkPathParam();
    this.apiSubscription = this.panZoomConfig.api.subscribe((api: PanZoomAPI) => this.panZoomAPI = api);
    this.modelChangedSubscription = this.panZoomConfig.modelChanged.subscribe((model: PanZoomModel) => this.onModelChanged(model));
  }

  ngOnDestroy(): void {
    this.dataService.isEditorOpen = false;
    this.apiSubscription.unsubscribe();
    this.modelChangedSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  checkPathParam(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params.bid !== null && params.bid !== undefined && params.bid !== '') {
        this.loadBoard(params.bid);
      }
    });
  }

  loadBoard(bid): void {
    this.boardSubscription = this.httpService.getBoardById(bid).subscribe(value => this.board = value);
  }


  ngAfterViewInit(): void {
    this.grid.nativeElement.style.backgroundSize = this.panzoom.scale * this.gridSize + 'px';
  }

  zoomTo(posX, posY): void {
    try {
      if (this.focused.x !== posX && this.focused.y !== posY) {
        this.gridVisible = false;
        this.panZoomAPI.config.panOnClickDrag = false;
        this.panZoomAPI.zoomToFit({x: posX - 250, y: posY - 250, width: 800, height: 800}, 0.35);
        setTimeout(() => {
          this.gridVisible = true;
          this.setGridPosition(this.panZoomAPI.model);
          this.focused.x = posX;
          this.focused.y = posY;
          this.panZoomAPI.config.panOnClickDrag = true;
        }, 350);
      }
    } catch (e) {
      console.error(e);
    }
  }

  resetFocus(): void {
    this.focused.x = null;
    this.focused.y = null;
  }

  onModelChanged(model: PanZoomModel): void {
    this.resetFocus();
    this.setGridPosition(model);
  }

  setGridPosition(model: PanZoomModel): void {
    if (this.gridVisible && this.grid !== undefined) {
      this.grid.nativeElement.style.backgroundPositionX = model.pan.x + 'px';
      this.grid.nativeElement.style.backgroundPositionY = model.pan.y + 'px';
      this.grid.nativeElement.style.backgroundSize = this.panzoom.scale * this.gridSize + 'px';
    }
  }

  @HostListener('mouseup')
  onMouseup(): void {
    this.dragAndDropService.isDraging = false;
    this.dragAndDropService.dragHandler = null;
  }


  @HostListener('mousedown', ['$event'])
  onMousedown(event): void {
    if (event.target.id === 'dragHandle') {
      this.dragAndDropService.scale = this.panzoom.scale;
      this.dragAndDropService.dragHandler = event.target;
      this.dragAndDropService.isDraging = true;
      this.dragAndDropService.dragX = event.x;
      this.dragAndDropService.dragY = event.y;
    }
  }
}
