# Base image
FROM node:18-alpine AS base
WORKDIR /app

# Installer pnpm globalement
RUN npm install -g pnpm

# Copier les fichiers de gestion de dépendances
COPY package.json pnpm-lock.yaml* ./

# Stage de dépendances
FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN pnpm install --frozen-lockfile

# Stage de développement
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=development
EXPOSE 3000
CMD ["pnpm", "dev"]

# Stage de build pour la production
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Image de production finale
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "start"]
