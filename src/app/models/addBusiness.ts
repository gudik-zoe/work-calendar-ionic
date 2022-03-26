import { start } from 'repl';
import { Client } from './client';
import { Job } from './job';

export class BusinessForm {
  public client: string;
  public job: string;
  public startTime: string;
  public endTime: string;
  public note: string;
  public position: string;
  public businessId?: number;

  public constructor(
    client?: string,
    job?: string,
    startTime?: string,
    endTime?: string,
    note?: string,
    position?: string,
    businessId?: number
  ) {
    this.client = client;
    this.job = job;
    this.startTime = startTime;
    this.endTime = endTime;
    this.note = note;
    this.position = position;
    this.businessId = businessId;
  }
}
