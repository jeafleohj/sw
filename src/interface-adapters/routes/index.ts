import { planetModule } from "@/interface-adapters/routes/planet.routes";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { peopleModule } from "./people.routes";

type Module = {
  name: string;
  router: OpenAPIHono;
  // docPath: string;
  // uiPath: string;
  // title: string;
  // description: string;
};

const modules: Module[] = [peopleModule, planetModule];

const registerSwaggerDocs = (app: OpenAPIHono, modules: Module[]) => {
  modules.forEach(({ name, router }) => {
    app.route(`/api/${name}`, router)  });
};


const app = new OpenAPIHono();

registerSwaggerDocs(app, modules);

if (process.env.NODE_ENV === "development") {
  app.get("/ui", swaggerUI({ url: "/doc" }));
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "API de startwars",
      description: "",
    },
  });
}

export { app };
