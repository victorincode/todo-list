import { Component, OnInit } from '@angular/core';
import { ItemData } from 'src/app/interfaces/item-data.interface';
import { ItemHandlerService } from 'src/app/services/item-handler.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.sass'],
})
export class DeleteItemComponent implements OnInit {
  item!: ItemData;
  constructor(private readonly itemHandler: ItemHandlerService) {}

  ngOnInit(): void {
    this.item = this.itemHandler.selectedItem;
  }
  onDeleteItem() {
    this.itemHandler.deleteItem(this.item.id);
  }
  onDeleteAllItems() {
    this.itemHandler.deleteAllItems();
  }
  get deleteStatus() {
    return this.itemHandler.deleteStatus;
  }
  get deletionMessage() {
    return this.deleteStatus === 'single'
      ? `Are you sure you want to remove <strong>${this.item.title}</strong>?`
      : 'Are you sure you want to remove <strong>ALL</strong> data?';
  }
}
