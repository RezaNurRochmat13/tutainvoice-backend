import { describe, expect, it } from 'vitest';
import { validateConfig } from '../../src/config/index.js';

describe('validateConfig', () => {
  const baseEnv = {
    NODE_ENV: 'development',
    PORT: '3000',
    DATABASE_URL: 'postgresql://user:pass@localhost:5432/invoice',
  };

  it('returns parsed config on valid env', () => {
    const result = validateConfig(baseEnv);
    expect(result).toEqual({
      nodeEnv: 'development',
      port: 3000,
      databaseUrl: 'postgresql://user:pass@localhost:5432/invoice',
    });
  });

  it('throws on missing DATABASE_URL', () => {
    const { DATABASE_URL: _, ...rest } = baseEnv;
    expect(() => validateConfig(rest)).toThrow('DATABASE_URL');
  });

  it('throws on invalid PORT', () => {
    expect(() => validateConfig({ ...baseEnv, PORT: 'abc' })).toThrow('PORT');
  });

  it('defaults PORT to 3000 when unset', () => {
    const { PORT: _, ...rest } = baseEnv;
    expect(validateConfig(rest).port).toBe(3000);
  });

  it('defaults NODE_ENV to development when unset', () => {
    const { NODE_ENV: _, ...rest } = baseEnv;
    expect(validateConfig(rest).nodeEnv).toBe('development');
  });
});
