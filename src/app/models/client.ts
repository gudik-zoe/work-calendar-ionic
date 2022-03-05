export class Client {
  public id?: number;
  public fullName!: string;
  public timestamp: Date;
  public color: string;
  constructor(fullName: string, color: string) {
    this.fullName = fullName;
    this.color = color;
  }
}
