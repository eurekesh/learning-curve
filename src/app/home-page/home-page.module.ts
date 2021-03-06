import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent, HomePageComponent} from './home-page.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomePageComponent,
    DialogComponent
  ],
  exports: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule
  ]
})
export class HomePageModule {
}
