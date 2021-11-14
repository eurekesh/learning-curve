import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {TopNavModule} from "../top-nav/top-nav.module";
import {HomePageModule} from "../home-page/home-page.module";
import {AppRoutingModule} from "../app-routing.module";
import {PlaygroundModule} from "../playground/playground.module";


@NgModule({
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    TopNavModule,
    HomePageModule,
    AppRoutingModule,
    PlaygroundModule
  ]
})
export class LayoutModule { }
