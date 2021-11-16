import {Component, OnInit} from '@angular/core';
import {RoomServiceService} from "../shared/services/room-service.service";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(readonly rs: RoomServiceService) {

  }

  ngOnInit(): void {
  }

}
