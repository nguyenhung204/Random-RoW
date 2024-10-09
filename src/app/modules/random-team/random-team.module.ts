import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashBoardComponent } from './main-dash-board/main-dash-board.component';
import { SettingsComponent } from './settings/settings.component';
import { RandomTeamRoutingModule } from './random-team-routing.module';
import { FormsModule } from '@angular/forms';
import { RandomUserComponent } from './random-user/random-user.component';
import { ConfigurationComponent } from './settings/child-components/configuration/configuration.component';
import { ViewUserListComponent } from './settings/child-components/view-user-list/view-user-list.component';
import { TeamModule } from 'src/app/shared-components/team/team.module';
import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    MainDashBoardComponent,
    SettingsComponent,
    RandomUserComponent,
    ConfigurationComponent,
    ViewUserListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RandomTeamRoutingModule,
    TeamModule
  ],
  providers: [
    // {
    //   provide: API_KEY,
    //   useValue: environment.googleApisKeys.googleSheet,
    // },
    // GoogleSheetsDbService
  ]
})
export class RandomTeamModule { }
