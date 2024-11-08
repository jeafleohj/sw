import { z } from "zod";

export const peopleSchema = z.object({
  nombre: z.string(),
  anhoNacimiento: z.string(),
  colorOjos: z.string(),
  genero: z.string(),
  colorCabello: z.string(),
  altura: z.string(),
  masa: z.string(),
  colorPiel: z.string(),
  mundoNatal: z.string(),
  peliculas: z.array(z.string()).optional().default([]),
  especies: z.array(z.string()).optional().default([]),
  navesEstelares: z.array(z.string()).optional().default([]),
  vehiculos: z.array(z.string()).optional().default([]),
  url: z.string().url(),
});
