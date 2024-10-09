import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "random",
    loadChildren: () => import('./modules/random-team/random-team.module').then(m => m.RandomTeamModule)
  },
  { path: '', redirectTo: '/random', pathMatch: 'full' },
  { path: '**', redirectTo: '/random' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
