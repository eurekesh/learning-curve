import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {RoomServiceService} from "../shared/services/room-service.service";
import {filter, take, tap} from "rxjs";
import {ConnectionState} from "../shared/enums/connection-state";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private readonly roomConnectionState$;

  constructor(public dialog: MatDialog,
              readonly rs: RoomServiceService,
              private _snackbar: MatSnackBar,
              private _route: Router) {
    this.roomConnectionState$ = this.rs.connectionState$;
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(DialogComponent, dialogConfig);
  }

  requestRoomCreation() {
    this.rs.resetConnectionState();
    this.rs.createRoom();
    this.rs.listenForRoomJoin();
    this.roomConnectionState$
      .pipe(
        filter(state => state !== ConnectionState.Disconnected),
        take(1),
        tap(state => {
          console.log('state here');
          if (state === ConnectionState.ConnectionFailed) {
            this._snackbar.open('Room could not be created, please try again', 'Okay', {
              duration: 3000
            })
          } else if (state === ConnectionState.Connected) {
            this._route.navigate(['/playground']);
            console.log('join successful');
          }
        })
      )
      .subscribe();
  }

}

@Component({
  selector: 'home-page-dialog',
  templateUrl: './home-page-dialog.component.html',
})
export class DialogComponent {
  inputRoomId = '';
  private readonly roomConnectionState$;

  constructor(readonly rs: RoomServiceService,
              private readonly _route: Router,
              private readonly _snackbar: MatSnackBar,
              private readonly _dialogRef: MatDialogRef<DialogComponent>) {
    this.roomConnectionState$ = this.rs.connectionState$;
  }

  requestRoomJoin() {
    if (this.inputRoomId.length < 4 || this.inputRoomId.length > 7) // basic validation
    {
      this._snackbar.open('Please enter a valid Room Id', 'Okay', {
        duration: 3000
      })
      return;
    }
    this.rs.resetConnectionState();
    this.rs.listenForRoomJoin();
    this.rs.joinRoom(this.inputRoomId);

    this.roomConnectionState$
      .pipe(
        filter(state => state !== ConnectionState.Disconnected),
        take(1),
        tap(state => {
          if (state === ConnectionState.ConnectionFailed) {
            this._snackbar.open('Room id could not be found, please try again', 'Okay', {
              duration: 3000
            })
          } else if (state === ConnectionState.Connected) {
            this._dialogRef.close();
            this._route.navigate(['/playground']);
            console.log('join successful');

          }
        })
      )
      .subscribe();
  }
}
