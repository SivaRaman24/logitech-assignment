import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabItem } from '../models/Item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent {
  @Input() tab!: TabItem;

  @Output() deleteTabHandler = new EventEmitter<number>();

  deleteTab() {
    this.deleteTabHandler.emit(this.tab.id);
  }
}
