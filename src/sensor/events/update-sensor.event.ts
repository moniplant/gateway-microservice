export class UpdateSensorEvent {
  constructor(
    public id: string,
    public label: string,
    public plant: string,
    public type: string,
  ) {}

  toString() {
    return JSON.stringify({
      id: this.id,
      label: this.label,
      plant: this.plant,
      type: this.type,
    });
  }
}
