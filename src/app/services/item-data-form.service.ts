import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemData } from '../interfaces/item-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemDataFormService {
  todoItemFormGroup: FormGroup;
  maxContentLength = 256;

  constructor(private readonly formBuilder: FormBuilder) {
    this.todoItemFormGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: [
        '',
        [Validators.required, Validators.maxLength(this.maxContentLength)],
      ],
    });
  }
  get title() {
    return this.todoItemFormGroup.get('title');
  }
  get content() {
    return this.todoItemFormGroup.get('content');
  }
  setValue(item: ItemData) {
    this.todoItemFormGroup.setValue({
      title: item.title,
      content: item.content,
    });
  }
  reset() {
    this.todoItemFormGroup.reset();
  }
}
