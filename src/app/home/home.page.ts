import { Component } from '@angular/core';
import { UtilityService } from '../utility/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private utilityService: UtilityService) {}
}
