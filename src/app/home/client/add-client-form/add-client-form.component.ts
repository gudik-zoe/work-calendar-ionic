import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.scss'],
})
export class AddClientFormComponent implements OnInit {
  constructor(private formbuilder: FormBuilder) {}
  addClientForm: FormGroup;
  @Output() confirmForm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  fillAddClientForm() {
    this.addClientForm = this.formbuilder.group({
      clientName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  saveClient() {
    this.confirmForm.emit(this.addClientForm.get('clientName').value);
  }

  close() {
    this.cancel.emit(false);
  }
  ngOnInit() {
    this.fillAddClientForm();
  }
}
