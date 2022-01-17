import { Validator } from './validator';

export class FormField {
  public initialValue: string;
  public fieldName: string;
  public placeHolder: string;
  public type: string;
  public validators: Validator;
}
