import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './webapp/dashboard/dashboard.component';
import {WebappComponent} from './webapp/webapp.component';
import {BoardsComponent} from './webapp/boards/boards.component';
import {UploadsComponent} from './webapp/uploads/uploads.component';
import {HelpComponent} from './webapp/help/help.component';
import {SettingsComponent} from './webapp/settings/settings.component';
import {EditorComponent} from "./webapp/editor/editor.component";
import {LandingpageComponent} from './landingpage/landingpage.component';

const routes: Routes = [
  // {path: '', redirectTo: '/app', pathMatch: 'full'},
  {path: '', component: LandingpageComponent},
  {
    path: 'app',
    component: WebappComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        component: DashboardComponent
      }, {
        path: 'boards',
        component: BoardsComponent
      }, {
        path: 'uploads',
        component: UploadsComponent
      }, {
        path: 'help',
        component: HelpComponent
      }, {
        path: 'settings',
        component: SettingsComponent
      }, {
        path: 'editor',
        component: EditorComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
