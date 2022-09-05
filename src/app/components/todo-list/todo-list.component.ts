import { Component, OnInit } from '@angular/core';
import { ItemData } from 'src/app/interfaces/item-data.interface';
import { DialogService } from 'src/app/services/dialog.service';
import { ItemHandlerService } from 'src/app/services/item-handler.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent implements OnInit {
  searchTitle: string = '';
  itemInformation!: ItemData[];

  constructor(
    private readonly itemHandler: ItemHandlerService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.itemHandler.itemInformation$.subscribe(
      (data) => (this.itemInformation = data)
    );
  }

  onAddTodoDialog() {
    this.itemHandler.onAddTodoDialog();
  }
  onItemInformation(item: ItemData) {
    this.itemHandler.onItemInformationDialog(item);
  }
  onItemDeleteDialog(item: ItemData) {
    this.itemHandler.openItemDeleteDialog(item);
  }
  onDeleteAllDataDialog() {
    this.itemHandler.setDeleteStatus('all');
    this.dialogService.openDeleteItem();
  }
}
