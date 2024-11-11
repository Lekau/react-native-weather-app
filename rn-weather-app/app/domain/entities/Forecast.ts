export interface DayForecast {
  day: string;
  temperature: number;
  condition: string;
}

export class Forecast {
  readonly days: DayForecast[];

  constructor(days: DayForecast[]) {
    this.validateForecast(days);
    this.days = days;
  }

  private validateForecast(days: DayForecast[]): void {
    if (!days || days.length === 0) {
      throw new Error('Forecast must contain at least one day');
    }
    if (days.length > 5) {
      throw new Error('Forecast cannot exceed 5 days');
    }
  }
} 