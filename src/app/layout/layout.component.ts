import { Component, OnInit } from '@angular/core';
import {RoomServiceService} from "../services/room-service.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(readonly roomService: RoomServiceService) { }

  ngOnInit(): void {
  }

}
