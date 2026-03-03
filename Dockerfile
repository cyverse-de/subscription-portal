FROM node:24 AS deps
WORKDIR /src
COPY package.json package-lock.json /src/
RUN npm ci

FROM node:24 AS builder
WORKDIR /src
COPY --from=deps /src/node_modules ./node_modules
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs24-debian13
WORKDIR /app
COPY --from=builder /src/.next/standalone ./
COPY --from=builder /src/.next/static ./.next/static
COPY --from=builder /src/public ./public

EXPOSE 3000
CMD ["server.js"]

LABEL org.label-schema.vcs-url="https://github.com/cyverse-de/subscription-portal"
