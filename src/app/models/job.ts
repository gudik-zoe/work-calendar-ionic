export class Job {
  public id!: number;
  public description!: string;
  public date!: Date;
  constructor(description: string) {
    this.description = description;
  }
}
