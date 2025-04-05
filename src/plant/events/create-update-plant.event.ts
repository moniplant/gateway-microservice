export class CreateorUpdatePlantEvent {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public location: string,
    public plantTypeAlias: string,
    public adoptionDate: Date,
  ) {}

  toString() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      location: this.location,
      plantTypeAlias: this.plantTypeAlias,
      description: this.description,
      adoptionDate: this.adoptionDate,
    });
  }
}
