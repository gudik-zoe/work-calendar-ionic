export class Job {
  public id!: number;
  public description!: string;
  public date!: Date;
  constructor(id: number, description: string) {
    this.id = id;
    this.description = description;
  }
}
