import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashBoardComponent } from './main-dash-board/main-dash-board.component';
import { RandomUserComponent } from './random-user/random-user.component';
import { ConfigurationComponent } from './settings/child-components/configuration/configuration.component';
import { ViewUserListComponent } from './settings/child-components/view-user-list/view-user-list.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    {
        path: "",
        component: MainDashBoardComponent
    },
    {
        path: "student",
        component: RandomUserComponent
    },
    {
        path: "0981541295",
        component: SettingsComponent,
        children: [
            {
                path: "",
                component: ConfigurationComponent
            },
            {
                path: "list",
                component: ViewUserListComponent
            }
        ]
    },
    {
        path: "b463f78233b548a6a24e05593a777971",
        redirectTo: "0981541295"
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomTeamRoutingModule { }