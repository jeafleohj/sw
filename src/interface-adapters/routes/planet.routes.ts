import { planetSchema } from "@/application/schemas/planetSchema";
import { DynamoPlanetRepository } from "@/infrastructure/repositories/DynamoPlanetRepository";
import { SwapiPlanetService } from "@/infrastructure/services/SwapiPlanetService";
import { CreatePlanetController } from "@/interface-adapters/controllers/PlanetController";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

const planetRouter = new OpenAPIHono();

const planetService = new SwapiPlanetService();
const planetRepository = new DynamoPlanetRepository();
const planetController = CreatePlanetController(planetRepository, planetService);

const createPlanetRoute = createRoute({
  method: "post",
  path: "/planet",
  tags: ["planet"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: planetSchema,
        },
      },
    },
  },
  responses: {
    201: { description: "Planeta creado exitosamente" },
    400: { description: "Payload inválido" },
  },
});

const getPlanetRoute = createRoute({
  method: "get",
  path: "/planet/:id",
  tags: ["planet"],
  request: {
    params: z.object({
      id: z.string().openapi({ example: "456" }),
    }),
  },
  responses: {
    200: {
      schema: planetSchema,
      description: "Planeta encontrado exitosamente",
    },
    404: { description: "Planeta no encontrado" },
  },
});

planetRouter.openapi(createPlanetRoute, (c) => planetController.createPlanet(c));

planetRouter.openapi(getPlanetRoute, (c) => planetController.getPlanet(c));

export const planetModule = {
  name: "planets",
  router: planetRouter,
  // docPath: "/doc/planets",
  // uiPath: "/ui/planets",
  // title: "Planets API",
  // description: "API para gestionar información de planetas",
};
