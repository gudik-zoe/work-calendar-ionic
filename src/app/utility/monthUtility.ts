export class MonthUtility {
  public monthMap = new Map<string, number>();

  constructor() {
    this.monthMap.set('Giennaio', 0);
    this.monthMap.set('Febbraio', 1);
    this.monthMap.set('Marzo', 2);
    this.monthMap.set('Aprile', 3);
    this.monthMap.set('Maggio', 4);
    this.monthMap.set('Giugno', 5);
    this.monthMap.set('Luglio', 6);
    this.monthMap.set('Agosto', 7);
    this.monthMap.set('Settembre', 8);
    this.monthMap.set('Ottobre', 9);
    this.monthMap.set('Novembre', 10);
    this.monthMap.set('Dicembre', 11);
  }

  public getMonthMap() {
    return this.monthMap;
  }
}
