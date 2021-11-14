import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AppRoutingModule} from "../app-routing.module";



@NgModule({
  declarations: [
    InfoCardComponent
  ],
  exports: [
    InfoCardComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        AppRoutingModule,
        MatInputModule
    ]
})
export class InfoCardModule { }
