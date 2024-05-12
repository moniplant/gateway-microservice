export class CreatePlantEvent {
  constructor(
    public name: string,
    public description: string,
    public location: string,
    public adoptionDate: Date,
  ) {}

  toString() {
    return JSON.stringify({
      name: this.name,
      location: this.location,
      description: this.description,
      adoptionDate: this.adoptionDate,
    });
  }
}
