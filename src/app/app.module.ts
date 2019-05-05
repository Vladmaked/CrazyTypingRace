import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './pages/game/game.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AdminComponent} from './pages/admin/admin.component';
import {FirstPageComponent} from './pages/first-page/first-page.component';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: FirstPageComponent },
  { path: '', component: FirstPageComponent },
  { path: '**', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AdminComponent,
    FirstPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FirstPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
