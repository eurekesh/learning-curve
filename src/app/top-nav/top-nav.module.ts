import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SocketIoModule} from "ngx-socket-io";



@NgModule({
  declarations: [
    TopNavComponent
  ],
  exports: [
    TopNavComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SocketIoModule
  ]
})
export class TopNavModule { }
