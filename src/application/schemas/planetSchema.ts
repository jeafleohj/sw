import { z } from "zod";

export const planetSchema = z.object({
  nombre: z.string(),
  diametro: z.string(),
  periodoRotacion: z.string(),
  periodoOrbital: z.string(),
  gravedad: z.string(),
  poblacion: z.string(),
  clima: z.string(),
  terreno: z.string(),
  aguaSuperficial: z.string(),
  residentes: z.array(z.string()).optional().default([]),
  peliculas: z.array(z.string()).optional().default([]),
  url: z.string().url(),
});
