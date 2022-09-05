import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemData } from '../interfaces/item-data.interface';
import { ApiHandlerService } from './api-handler.service';
import { DialogService } from './dialog.service';
import { ItemDataFormService } from './item-data-form.service';

@Injectable({
  providedIn: 'root',
})
export class ItemHandlerService {
  private _itemInformation: ItemData[] = [];
  private itemInformationBehavior = new BehaviorSubject(this.itemInformation);
  public itemInformation$ = this.itemInformationBehavior.asObservable();

  public isUpdatingItem = false;
  public deleteStatus: string = 'single';
  public selectedItem!: ItemData;
  public errorMessage!: string;

  constructor(
    private readonly apiHandler: ApiHandlerService,
    private readonly dialogService: DialogService,
    private readonly itemDataFormService: ItemDataFormService
  ) {
    this.apiHandler.getData().subscribe((data) => {
      this.itemInformation = data;
    });
  }

  private set itemInformation(newData: ItemData[]) {
    this._itemInformation = newData;
    this.itemInformationBehavior.next(this._itemInformation);
  }
  private get itemInformation() {
    return this._itemInformation;
  }
  selectItem(item: ItemData) {
    this.selectedItem = item;
    this.setDeleteStatus('single');
  }
  addItem(item: ItemData) {
    this.apiHandler.postItem(item).subscribe((observer) => {
      this.itemInformation = [
        ...this.itemInformation,
        { ...item, id: observer.name },
      ];
      this.dialogService.closeDialog();
    });
  }
  deleteAllItems() {
    this.apiHandler.deleteAllItems().subscribe(() => {
      this.itemInformation = [];
      this.dialogService.closeDialog();
    });
  }
  deleteItem(id: string) {
    this.apiHandler.deleteItem(id).subscribe(() => {
      this.itemInformation = this.itemInformation.filter(
        (toDelete) => toDelete.id !== id
      );
      this.dialogService.closeDialog();
    });
  }
  updateItem(id: string, updates: {}) {
    this.apiHandler.updateItem(id, updates).subscribe((response) => {
      this.itemInformation = this.itemInformation.map((data) => {
        if (data.id === id) {
          return (data = { ...response, id: id });
        }
        return data;
      });
      this.dialogService.closeDialog();
    });
  }
  onAddTodoDialog() {
    this.isUpdatingItem = false;
    this.itemDataFormService.reset();
    this.dialogService.openAddItem();
  }
  openItemDeleteDialog(item: ItemData) {
    this.selectItem(item);
    this.dialogService.openDeleteItem();
    this.setDeleteStatus('single');
  }
  onItemInformationDialog(item: ItemData) {
    this.dialogService.openItemInformation();
    this.selectItem(item);
  }

  setDeleteStatus(status: string) {
    if (status === 'single' || status === 'all') {
      this.deleteStatus = status;
    }
  }
}
