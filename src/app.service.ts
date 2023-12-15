import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PLANTS_SERVICE } from './tokens';

@Injectable()
export class AppService {
  constructor(
    @Inject(PLANTS_SERVICE) private readonly plantClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
