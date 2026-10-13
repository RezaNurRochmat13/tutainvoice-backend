import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url().refine(
    (url) => url.startsWith('postgresql://') || url.startsWith('postgres://'),
    'DATABASE_URL must be a postgres connection string',
  ),
}).transform((env) => ({
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
}));

export type AppConfig = z.infer<typeof envSchema>;

export function validateConfig(
  env: Record<string, string | undefined>,
): AppConfig {
  return envSchema.parse(env);
}

let cached: AppConfig | undefined;

export const config: AppConfig = new Proxy({} as AppConfig, {
  get(_, prop) {
    if (!cached) {
      cached = validateConfig(process.env);
    }
    return Reflect.get(cached, prop);
  },
});
