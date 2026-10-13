FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma ./prisma
RUN pnpm prisma:generate

COPY tsconfig.json vitest.config.ts ./
COPY src ./src

EXPOSE 3000

CMD ["pnpm", "dev"]
