import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  @Input() title: String = "YEETUS";
  @Input() subtitle: String = "yuh";
  @Input() formInstructions: String = "YEEEEEEEE";
  @Input() buttonText: String = "I'm a silly willy butty wutton"

  constructor() { }

  ngOnInit(): void {
  }

}
