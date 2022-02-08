import { Component, Input, OnInit } from '@angular/core';
import { Business } from 'src/app/models/business';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  @Input() business: Business;
  @Input() backPath: string;
  constructor() {}

  ngOnInit() {}
}
