import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormField } from 'src/app/models/formField';
import { Validator } from 'src/app/models/validator';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formFields: FormField[];
  @Output() submitForm = new EventEmitter();
  @Output() closeForm = new EventEmitter();
  constructor(private formbuilder: FormBuilder) {}
  dynamicForm: FormGroup;

  submit() {
    this.submitForm.emit(this.dynamicForm.value);
  }

  close() {
    this.closeForm.emit(null);
  }

  toFormGroup() {
    let formGroup = {};
    for (let field of this.formFields) {
      formGroup[field.fieldName] = new FormControl(
        field.initialValue,
        Validators.compose([
          field.validators.required ? Validators.required : null,
          field.validators.minLength > 0
            ? Validators.minLength(field.validators.minLength)
            : null,
        ])
      );
    }
    this.dynamicForm = new FormGroup(formGroup);
  }

  ngOnInit() {
    console.log(this.formFields);
    this.toFormGroup();
  }
}
