import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddCardDialogComponent, TopNavComponent} from './top-nav.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    TopNavComponent,
    AddCardDialogComponent
  ],
  exports: [
    TopNavComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    MatInputModule
  ]
})
export class TopNavModule {
}
