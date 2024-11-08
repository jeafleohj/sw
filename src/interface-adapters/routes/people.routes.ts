import { peopleSchema } from "@/application/schemas/peopleSchema";
import { DynamoPeopleRepository } from "@/infrastructure/repositories/DynamoPeopleRepository";
import { SwapiPeopleService } from "@/infrastructure/services/SwapiPeopleService";
import { CreatePeopleController } from "@/interface-adapters/controllers/PeopleController";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

const peopleRouter = new OpenAPIHono();

const peopleService = new SwapiPeopleService();
const peopleRepository = new DynamoPeopleRepository();
const peopleController = CreatePeopleController(peopleRepository, peopleService);

export const createPeopleRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["people"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: peopleSchema,
        },
      },
    },
  },
  responses: {
    201: { description: "Persona creada exitosamente" },
    400: { description: "Payload inválido" },
  },
});

export const getPeopleRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["people"],
  request: {
    params: z.object({
      id: z.string().openapi({ example: "1" }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: peopleSchema,
        },
      },
      description: "Persona encontrada exitosamente",
    },
    404: { description: "Persona no encontrada" },
  },
});

const docControllers = [
  {
    route: createPeopleRoute,
    controller: peopleController.createPerson,
  },
  {
    route: getPeopleRoute,
    controller: peopleController.getPerson,
  },
];

docControllers.forEach(({ route, controller }) => {
  peopleRouter.openapi(route, controller);
});

export const peopleModule = {
  name: "people",
  router: peopleRouter,
  // docPath: "/doc/people",
  // uiPath: "/ui/people",
  // title: "People API",
  // description: "API para gestionar información de personas",
};
