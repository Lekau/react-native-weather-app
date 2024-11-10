interface WeatherProps {
  temperature: number;
  condition: string;
  location: string;
}

export class Weather {
  readonly temperature: number;
  readonly condition: string;
  readonly location: string;

  constructor(props: WeatherProps) {
    this.validateTemperature(props.temperature);
    
    this.temperature = props.temperature;
    this.condition = props.condition;
    this.location = props.location;
  }

  private validateTemperature(temperature: number): void {
    if (temperature < -90 || temperature > 60) {
      throw new Error('Invalid temperature');
    }
  }
} 