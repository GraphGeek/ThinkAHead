import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

const routes: Routes = [
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'game', component: GameComponent },
  // redirect to `main-menu`
  { path: '',   redirectTo: '/main-menu', pathMatch: 'full' },
  { path: '**', redirectTo: '/main-menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
