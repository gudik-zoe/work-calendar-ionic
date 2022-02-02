import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Client } from 'src/app/models/client';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss'],
})
export class SelectModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}
  @Input() theList: Client[] | Job[];
  @Input() title: string;
  @Input() backPath: string;
  @Input() searchPlaceHolder: string;
  filteredItems: string[];
  searchText: string;

  initiateFilterItems() {
    this.filteredItems = this.theList.map((item: any) => {
      return item.fullName || item.description;
    });
  }
  FilterItems() {
    this.initiateFilterItems();
    if (this.searchText && this.searchText.trim() !== '') {
      this.filteredItems = this.filteredItems.filter((item) => {
        return item.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  selectValue(data) {
    this.modalCtrl.dismiss(
      {
        selectedValue: data,
      },
      'confirm'
    );
  }

  ngOnInit() {
    this.initiateFilterItems();
  }
}
