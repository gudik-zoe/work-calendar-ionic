import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from 'src/app/models/formField';

@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.scss'],
})
export class AddClientFormComponent implements OnInit {
  constructorr() {}
  addClientFormFields: FormField[] = [
    {
      fieldName: 'clientName',
      type: 'string',
      initialValue: '',
      placeHolder: 'Mario Rossi',
      validators: {
        required: true,
        minLength: 3,
      },
    },
  ];
  @Output() confirmForm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  saveClient(data) {
    this.confirmForm.emit(data);
  }

  close(data) {
    this.cancel.emit(data);
  }
  ngOnInit() {}
}
