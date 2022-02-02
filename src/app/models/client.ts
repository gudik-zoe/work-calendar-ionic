export class Client {
  public id?: number;
  public fullName!: string;
  public timestamp: Date;
  constructor(fullName: string) {
    this.fullName = fullName;
  }
}
