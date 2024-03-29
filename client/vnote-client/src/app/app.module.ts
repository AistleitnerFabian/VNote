import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './webapp/dashboard/dashboard.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {AngularEditorModule} from '@kolkov/angular-editor';

// Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {WebappComponent} from './webapp/webapp.component';
import {BoardsComponent} from './webapp/boards/boards.component';
import {UploadsComponent} from './webapp/uploads/uploads.component';
import {HelpComponent} from './webapp/help/help.component';
import {SettingsComponent} from './webapp/settings/settings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EditorComponent} from './webapp/editor/editor.component';
import {NgxPanZoomModule} from 'ngx-panzoom';
import {NoteComponent} from './webapp/editor/note/note.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ColorSketchModule} from 'ngx-color/sketch';
import {DragAndDropService} from './webapp/editor/drag-and-drop.service';
import {LandingpageComponent} from './landingpage/landingpage.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BoardComponent} from './webapp/boards/board/board.component';
import {HttpService} from './service/http.service';
import {WebsocketService} from './service/websocket.service';
import {DataService} from './service/data.service';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SectionAppComponent} from './landingpage/section-app/section-app.component';
import {SectionAboutComponent} from './landingpage/section-about/section-about.component';
import {SectionInfoComponent} from './landingpage/section-info/section-info.component';
import {ColorCircleModule} from 'ngx-color/circle';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToolbarComponent,
    SidebarComponent,
    WebappComponent,
    BoardsComponent,
    UploadsComponent,
    HelpComponent,
    SettingsComponent,
    EditorComponent,
    NoteComponent,
    LandingpageComponent,
    BoardComponent,
    LoginComponent,
    RegisterComponent,
    SectionAppComponent,
    SectionAboutComponent,
    SectionInfoComponent,
  ],
  imports: [
    HttpClientModule,
    AngularEditorModule,
    NgxPanZoomModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatRippleModule,
    FormsModule,
    FlexLayoutModule,
    DragDropModule,
    ColorCircleModule,
    ReactiveFormsModule
  ],
  providers: [
    DragAndDropService,
    HttpService,
    WebsocketService,
    DataService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
