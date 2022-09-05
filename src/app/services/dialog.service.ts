import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoItemComponent } from '../components/add-todo-item/add-todo-item.component';
import { DeleteItemComponent } from '../components/delete-item/delete-item.component';
import { ViewItemInformationComponent } from '../components/view-item-information/view-item-information.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private readonly matDialog: MatDialog) {}

  openAddItem() {
    this.matDialog.open(AddTodoItemComponent);
  }
  openDeleteItem() {
    this.matDialog.open(DeleteItemComponent);
  }
  openItemInformation() {
    this.matDialog.open(ViewItemInformationComponent);
  }

  closeDialog() {
    this.matDialog.closeAll();
  }
}
