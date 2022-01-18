export class Client {
  public id?: number;
  public fullName!: string;
  constructor(fullName: string) {
    this.fullName = fullName;
  }
}
