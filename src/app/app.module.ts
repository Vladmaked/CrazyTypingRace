import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './pages/game/game.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AdminComponent} from './pages/admin/admin.component';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
