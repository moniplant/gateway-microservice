export class CreateorUpdateSensorEvent {
  constructor(
    public id: string,
    public label: string,
    public plant_id: string,
    public quantity: string,
    public unit: string,
  ) {}

  toString() {
    return JSON.stringify({
      id: this.id,
      label: this.label,
      plant_id: this.plant_id,
      quantity: this.quantity,
      unit: this.unit,
    });
  }
}
