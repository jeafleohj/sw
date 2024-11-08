import { DynamoPeopleRepository } from '@/infrastructure/repositories/DynamoPeopleRepository';
import { DynamoPlanetRepository } from '@/infrastructure/repositories/DynamoPlanetRepository';
import { SwapiPeopleService } from '@/infrastructure/services/SwapiPeopleService';
import { SwapiPlanetService } from '@/infrastructure/services/SwapiPlanetService';
import { CreatePeopleController } from '@/interface-adapters/controllers/PeopleController';
import { CreatePlanetController } from '@/interface-adapters/controllers/PlanetController';
import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';

const app = new Hono();

const peopleController = CreatePeopleController(new DynamoPeopleRepository(), new SwapiPeopleService());

const planetService = new SwapiPlanetService();
const planetRepository = new DynamoPlanetRepository();
const planetController = CreatePlanetController(planetRepository, planetService);

app.post('/api/people', peopleController.createPerson);
app.post('/api/planet', planetController.createPlanet);

export const handler = handle(app);
