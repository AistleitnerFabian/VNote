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
import {Note} from '../../model/note';
import {animate, style, transition, trigger} from '@angular/animations';
import {DataService} from '../../service/data.service';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Board} from '../../model/board';
import {WebsocketService} from '../../service/websocket.service';
import {MatMenuTrigger} from '@angular/material/menu';

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
  private boardSubscription: Subscription;
  private noteSubscription: Subscription;
  gridSize = 150;
  @ViewChild('grid') grid;
  @ViewChild('panzoom') panzoom;
  board: Board;
  gridVisible = true;
  focused = {x: null, y: null};
  notes: Note[] = [];

  colorMap = new Map([
    ['cRED', '#FF6962'],
    ['cORANGE', '#F99853'],
    ['cYELLOW', '#F8D568'],
    ['cGREEN', '#8FE381'],
    ['cAQUA', '#C5ECE3'],
    ['cBLUE', '#AAE5EF'],
    ['cPURPLE', '#B19CD8'],
    ['cPINK', '#F17FC5']
  ]);

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  constructor(private dragAndDropService: DragAndDropService, private dataService: DataService,
              private route: ActivatedRoute, private httpService: HttpService, private websocketService: WebsocketService) {
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
    this.boardSubscription.unsubscribe();
    this.noteSubscription.unsubscribe();
    this.websocketService.unsubscribeBoardChanges();
  }

  checkPathParam(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params.bid !== null && params.bid !== undefined && params.bid !== '') {
        this.loadBoard(params.bid);
      } else {
        this.checkBoard();
      }
    });
  }

  checkUser(): void {
    if (this.board.contributors == null) {
      this.board.contributors = [];
    }
    if (this.dataService.authenticatedUser.id != null && this.dataService.authenticatedUser.id !== '') {
      if (this.board.userId !== this.dataService.authenticatedUser.id &&
        !this.board.contributors.includes(this.dataService.authenticatedUser.id)) {
        this.board.contributors.push(this.dataService.authenticatedUser.id);
        this.httpService.updateBoard(this.board).subscribe();
      }
    }
    this.httpService.updateLatestBoard(this.dataService.authenticatedUser.id, this.board.id).subscribe();
  }

  loadBoard(bid): void {
    this.boardSubscription = this.httpService.getBoardById(bid).subscribe(value => {
      this.board = value;
      this.checkUser();
      this.dataService.currentBoardName.next(value.boardName);
      this.dataService.currentBoardName.subscribe(val => this.boardNameChanged(val));
    });
    this.noteSubscription = this.httpService.getNotesByBoardId(bid).subscribe(value => this.notes = value);
    this.websocketService.getBoardChanges(bid);
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

  boardNameChanged(boardName): void {
    const newBoardName = boardName.trim();
    if (newBoardName !== this.board.boardName && newBoardName.length > 0) {
      this.board.boardName = newBoardName;
      this.dataService.currentBoardName.next(newBoardName);
      this.httpService.updateBoard(this.board).subscribe();
    }
  }

  @HostListener('mouseup')
  onMouseup(): void {
    this.dragAndDropService.isDraging = false;
    this.dragAndDropService.dragHandler = null;
  }


  @HostListener('mousedown', ['$event'])
  onMousedown(event): void {
    document.getElementById('board-name').blur();
    if (event.target.id === 'dragHandle') {
      this.dragAndDropService.scale = this.panzoom.scale;
      this.dragAndDropService.dragHandler = event.target;
      this.dragAndDropService.isDraging = true;
      this.dragAndDropService.dragX = event.x;
      this.dragAndDropService.dragY = event.y;
    }
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event): void {
    event.preventDefault();
    if (event.target.classList[0] === 'pan-zoom-frame') {
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }

  newNote(): void {
    console.log(this.panzoom.scale);
    const x = (parseFloat(this.contextMenuPosition.x) - this.panZoomAPI.model.pan.x) / this.panzoom.scale - 300;
    const y = (parseFloat(this.contextMenuPosition.y) - this.panZoomAPI.model.pan.y) / this.panzoom.scale - 300;
    console.log(x + ' ' + y);
    this.notes.push(new Note(this.board.id, x, y, this.getRandomColor()));
  }

  getRandomColor(): string {
    let items = Array.from(this.colorMap.keys());
    return items[Math.floor(Math.random() * items.length)];
  }

  changeBoardName(): void {
    document.getElementById('board-name').focus();
  }

  private checkBoard() {
    console.log("check");
    if (this.board == null) {
      console.log("null");
      this.board = new Board();
      this.board.userId = this.dataService.authenticatedUser.id;
      this.board.boardName = 'New Board';
      this.httpService.updateBoard(this.board).subscribe();
    }
  }
}
