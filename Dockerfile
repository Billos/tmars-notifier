# Multi-stage Dockerfile for TMars Notifier with Vue.js frontend
FROM node:26.1-alpine AS base
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml tsconfig.json ./
COPY .yarn .yarn
RUN npm install -g corepack
RUN corepack enable


# Stage 1: Build frontend
FROM base AS frontend-builder
COPY . .
# Install dependencies and build frontend
RUN yarn install
RUN yarn build:frontend

# Stage 2: Build backend
FROM base AS backend-builder
COPY . .
RUN yarn install
RUN yarn tsc -p tsconfig.json

# Stage 3: Development stage (includes all dependencies)
FROM base AS development
COPY . .
RUN yarn install
ENTRYPOINT [ "yarn", "run" ]

# Stage 4: Production runtime
FROM base AS runtime
RUN yarn workspaces focus --all --production
COPY --from=backend-builder /app/build ./build
COPY --from=frontend-builder /app/dist/frontend ./dist/frontend

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/participants', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Use non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs

ENTRYPOINT [ "yarn" ]
CMD [ "start" ]