import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(DialogComponent, dialogConfig);
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'home-page-dialog',
  templateUrl: './home-page-dialog.component.html',
})
export class DialogComponent {}
