# Étape 1 : Build de l'application
FROM node:18.20.5-bullseye AS builder

WORKDIR /app

# Copier les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Build de l'application Next.js
RUN npm run build

# Étape 2 : Exécuter l'application en production
FROM node:18.20.5-bullseye

WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]
