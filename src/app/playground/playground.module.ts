import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangeQuestionDialog, PlaygroundComponent} from './playground.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    PlaygroundComponent,
    ChangeQuestionDialog
  ],
    imports: [
        CommonModule,
        MatSliderModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule
    ],
  exports: [
    PlaygroundComponent
  ]
})
export class PlaygroundModule { }
