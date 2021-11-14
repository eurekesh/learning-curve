import { Component, OnInit } from '@angular/core';
import {RoomServiceService} from "../services/room-service.service";
import {Card} from "../interfaces/card";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  localCard: Card[];

  constructor(readonly rs: RoomServiceService) {
    this.localCard = rs.getCards();
  }

  ngOnInit(): void {

  }

}
