import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {TopNavModule} from "../top-nav/top-nav.module";
import {HomePageModule} from "../home-page/home-page.module";



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
  ]
})
export class LayoutModule { }
