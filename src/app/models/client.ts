export class Client {
  public id?: number;
  public fullName!: string;
  public timestamp: Date;
  public color: string;
  constructor(id: number, fullName: string, color: string) {
    this.id = id;
    this.fullName = fullName;
    this.color = color;
  }
}
