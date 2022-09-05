import { Component, OnInit } from '@angular/core';
import { ItemData } from 'src/app/interfaces/item-data.interface';
import { DialogService } from 'src/app/services/dialog.service';
import { ItemDataFormService } from 'src/app/services/item-data-form.service';
import { ItemHandlerService } from 'src/app/services/item-handler.service';

@Component({
  selector: 'app-view-item-information',
  templateUrl: './view-item-information.component.html',
  styleUrls: ['./view-item-information.component.sass'],
})
export class ViewItemInformationComponent implements OnInit {
  constructor(
    private readonly dialogService: DialogService,
    private readonly itemHandler: ItemHandlerService,
    private readonly itemDataForm: ItemDataFormService
  ) {}
  item!: ItemData;
  ngOnInit(): void {
    this.item = this.itemHandler.selectedItem;
  }

  onEditItem() {
    this.dialogService.openAddItem();
    this.itemHandler.isUpdatingItem = true;
    this.itemDataForm.setValue(this.item);
  }
}
