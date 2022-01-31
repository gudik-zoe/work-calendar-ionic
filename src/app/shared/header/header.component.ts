/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() defaultHref: string;
  @Input() back: boolean;
  @Input() color: string;
  @Input() rightButton: boolean;
  @Input() rightButtonIcon: string;
  @Output() rightButtonFunction = new EventEmitter();

  constructor() {}

  doActionInFather(data) {
    this.rightButtonFunction.emit(data);
  }

  ngOnInit() {}
}
