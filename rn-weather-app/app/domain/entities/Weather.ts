interface WeatherProps {
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  condition: string;
  location: string;
}

export class Weather {
  readonly temperature: number;
  readonly minTemperature: number;
  readonly maxTemperature: number;
  readonly condition: string;
  readonly location: string;

  constructor(props: WeatherProps) {
    this.validateTemperature(props.temperature);
    this.validateTemperature(props.minTemperature);
    this.validateTemperature(props.maxTemperature);
    this.validateTemperatureRange(props.minTemperature, props.maxTemperature);

    this.temperature = props.temperature;
    this.minTemperature = props.minTemperature;
    this.maxTemperature = props.maxTemperature;
    this.condition = props.condition;
    this.location = props.location;
  }

  private validateTemperature(temperature: number): void {
    if (temperature < -90 || temperature > 60) {
      throw new Error('Temperature must be between -90°C and 60°C');
    }
  }

  private validateTemperatureRange(min: number, max: number): void {
    if (min > max) {
      throw new Error('Minimum temperature cannot be greater than maximum temperature');
    }
  }
} 