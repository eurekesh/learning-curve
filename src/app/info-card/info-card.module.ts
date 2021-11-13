import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";



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
        MatInputModule
    ]
})
export class InfoCardModule { }
