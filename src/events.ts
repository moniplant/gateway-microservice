// PLANT API - Kafka
export const CREATE_PLANT = 'plant.create';
export const LIST_PLANTS = 'plants.list';
export const DELETE_PLANT = 'plant.delete';
export const UPDATE_PLANT = 'plant.update';
export const RETRIEVE_PLANT = 'plant.retrieve';

//  PLANT API - Kafka: Events for plant_types table
export const CREATE_PLANT_TYPE = 'plant.type.create';
export const LIST_PLANT_TYPES = 'plant.type.list';

// SENSOR API - Kafka
export const CREATE_SENSOR = 'sensor.create';
export const DELETE_SENSOR = 'sensor.delete';
export const UPDATE_SENSOR = 'sensor.update';
export const RETRIEVE_SENSOR = 'sensor.retrieve';
export const LIST_PLANT_SENSORS = 'sensors.plant.list';
export const DELETE_PLANT_SENSORS = 'sensors.plant.delete';

// SENSOR DATA API - MQTT
export const SAVE_SENSOR_DATA = 'sensor.data.save';
export const GET_LATEST_SENSOR_DATA = 'sensor.data.latest.get';
