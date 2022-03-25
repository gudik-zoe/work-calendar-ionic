import { Client } from './client';
import { Job } from './job';

export class AddBusiness {
  public client: string;
  public job: string;
  public startTime: string;
  public endTime: string;
  public note: string;
  public position: string;
  public businessId?: number;
}
