# Multi-stage Dockerfile for TMars Notifier with Vue.js frontend

# Stage 1: Build frontend
FROM node:22.14.0-alpine AS frontend-builder
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
COPY vite.config.js ./
COPY frontend/ ./frontend/

# Install dependencies and build frontend
RUN yarn install --frozen-lockfile
RUN yarn build:frontend

# Stage 2: Build backend
FROM node:22.14.0-alpine AS backend-builder
WORKDIR /app

# Copy package files and source
COPY package.json yarn.lock tsconfig.json ./
COPY src/ ./src/

# Install dependencies
RUN yarn install --frozen-lockfile

# Build backend
RUN yarn tsc -p tsconfig.json

# Stage 3: Development stage (includes all dependencies)
FROM node:22.14.0-alpine AS development
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
COPY vite.config.js ./
COPY tsconfig.json ./

# Install all dependencies (dev + prod)
RUN yarn install --frozen-lockfile

# Copy source files
COPY src/ ./src/
COPY frontend/ ./frontend/

ENTRYPOINT [ "yarn" ]

# Stage 4: Production runtime
FROM node:22.14.0-alpine AS runtime
WORKDIR /app

# Install production dependencies only
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Copy built backend from backend-builder
COPY --from=backend-builder /app/build ./build

# Copy built frontend from frontend-builder
COPY --from=frontend-builder /app/dist/frontend ./dist/frontend

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/participants', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Use non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs

ENTRYPOINT [ "yarn" ]
CMD [ "start" ]