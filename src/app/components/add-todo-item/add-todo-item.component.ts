import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemData } from 'src/app/interfaces/item-data.interface';
import { ItemDataFormService } from 'src/app/services/item-data-form.service';
import { ItemHandlerService } from 'src/app/services/item-handler.service';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['./add-todo-item.component.sass'],
})
export class AddTodoItemComponent implements OnInit {
  todoFormGroup!: FormGroup;
  constructor(
    private readonly itemDataForm: ItemDataFormService,
    private readonly itemHandler: ItemHandlerService
  ) {}

  ngOnInit(): void {
    this.todoFormGroup = this.itemDataForm.todoItemFormGroup;
  }
  get title() {
    return this.itemDataForm.title;
  }
  get content() {
    return this.itemDataForm.content;
  }
  get maxLength() {
    return this.itemDataForm.maxContentLength;
  }
  get isUpdatingItem() {
    return this.itemHandler.isUpdatingItem;
  }
  onAddTodo() {
    if (this.todoFormGroup.invalid) return;
    this.itemHandler.addItem(this.todoFormGroup.value);
  }
  onUpdateTodo() {
    if (this.todoFormGroup.invalid) return;
    this.itemHandler.updateItem(
      this.itemHandler.selectedItem.id,
      this.todoFormGroup.value
    );
  }
}
