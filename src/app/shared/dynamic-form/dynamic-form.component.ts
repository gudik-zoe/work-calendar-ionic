import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from 'src/app/models/formField';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formFields: FormField[];
  @Output() submitFormInFather = new EventEmitter();
  @Output() closeFormInFather = new EventEmitter();
  constructor(private formbuilder: FormBuilder) {}
  dynamicForm: FormGroup;

  submitForm() {
    this.submitFormInFather.emit(this.dynamicForm.value);
  }

  close() {
    this.closeFormInFather.emit(null);
  }

  fillFormFields() {
    // if (this.formFields.length > 0) {
    //   let FormObject= []
    //     console.log(field);
    //     this.dynamicForm = this.formbuilder.group({
    //       field: [
    //         field.initialValue,
    //         [
    //           field.validators.required ? Validators.required : null,
    //           field.validators.minLength
    //             ? Validators.minLength(field.validators.minLength)
    //             : null,
    //         ],
    //       ],
    //     });
    // }
  }
  //   this.addClientForm = this.formbuilder.group({
  //     clientName: ['', [Validators.required, Validators.minLength(3)]],
  //   });
  attempt() {
    let array = [];
    if (this.formFields.length > 0) {
      let object = {};
      for (let field of this.formFields) {
        let theFieldName = field.fieldName;
        let initialValue = field.initialValue;
        let requiredValidator = field.validators.required;
        let minLengthValidator = field.validators.minLength;
        array.push({
          theFieldName: [
            initialValue,
            [
              requiredValidator ? Validators.required : null,
              minLengthValidator
                ? Validators.minLength(field.validators.minLength)
                : null,
            ],
          ],
        });
      }
      this.dynamicForm = this.formbuilder.group(
        array.map((item) => {
          return item;
        })
      );
    }
  }

  ngOnInit() {
    this.attempt();
  }
}
