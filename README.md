# 🚀 TMars Notifier

A notification system for Terraforming Mars game players, built with Node.js, Express, Vue.js, and Redis.

## 📋 Overview

TMars Notifier monitors Terraforming Mars game sessions and sends notifications to players when it's their turn to play. It supports multiple notification engines including ntfy.sh and Gotify, with a modern Vue.js frontend for easy configuration.

## ✨ Features

- 🎮 **Game Monitoring**: Automatically monitors TMars games and player status
- 📱 **Multiple Notification Engines**: Support for ntfy.sh, Gotify, and Discord
- 🖥️ **Modern Web Interface**: Vue.js frontend for easy configuration
- 🔄 **Real-time Updates**: Live monitoring with configurable intervals
- 🐳 **Docker Support**: Full containerization for development and production
- 🔒 **Redis Storage**: Persistent configuration and status storage
- 🌐 **CORS Ready**: Production-ready with configurable domains

## 🏗️ Architecture

- **Backend**: Node.js + Express + TypeScript
- **Frontend**: Vue.js 3 + Vite
- **Database**: Redis for caching and configuration
- **Containerization**: Docker + Docker Compose
- **Notifications**: ntfy.sh, Gotify, Discord

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ or Docker
- Redis (or use Docker Compose)
- TMars API access

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd tmars-notifier
   ```

2. **Install dependencies**

   ```bash
   yarn
   ```

3. **Configure environment**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**

   ```bash
   # Backend + Frontend together
   yarn dev:all

   # Or separately
   yarn dev          # Backend only (port 3000)
   yarn dev:frontend # Frontend only (port 5173)
   ```

### Docker Deployment

1. **Development with Docker**

   ```bash
   yarn docker:dev
   ```

2. **Production with Docker**
   ```bash
   yarn docker:prod
   ```

## 🔧 Configuration

Create a `.env` file based on `.env.example`:

```env
# TMars API Configuration
TMARS_URL=https://terraforming-mars.herokuapp.com
TMARS_TOKEN=your-token-here

# Redis Configuration
REDIS_URL=redis://redis:6379

# Server Configuration
PORT=3000
NODE_ENV=production
LOG_LEVEL=2

# Production URL (for frontend CORS)
PRODUCTION_URL=https://your-domain.com

# Optional: Gotify Configuration
GOTIFY_URL=https://your-gotify-server.com
GOTIFY_ADMIN_TOKEN=your-admin-token
```

### Environment Variables

| Variable             | Description                    | Default | Required  |
| -------------------- | ------------------------------ | ------- | --------- |
| `TMARS_URL`          | TMars API base URL             | -       | ✅        |
| `TMARS_TOKEN`        | TMars API authentication token | -       | ✅        |
| `REDIS_URL`          | Redis connection URL           | -       | ✅        |
| `PORT`               | Server port                    | `3000`  | ❌        |
| `PRODUCTION_URL`     | Frontend production URL        | -       | ✅ (prod) |
| `GOTIFY_URL`         | Gotify server URL              | -       | ❌        |
| `GOTIFY_ADMIN_TOKEN` | Gotify admin token             | -       | ❌        |

## 📡 API Endpoints

### Participants

- `GET /api/participants` - List all game participants

### Notifications

- `GET /api/notification/set/:engine` - Configure notification engine
  - Query params: `username`, `endpoint`
  - Engines: `ntfy`, `gotify`, `discord`
- `GET /api/notification/test` - Test notification
  - Query params: `username`

### Frontend

- `GET /ui/*` - Vue.js application interface

## 🎨 Frontend Usage

1. **Access the interface**: `http://localhost:3000/ui/`

2. **Configure notifications**:
   - Select your username from the participant list
   - Choose notification engine (ntfy.sh, Gotify, or Discord)
   - Enter your notification endpoint URL
   - Save configuration

3. **Test notifications**:
   - Select a username
   - Send a test notification to verify setup

## 🐳 Docker

### Development

```bash
# Start all services (backend, frontend, redis)
docker-compose -f docker-compose.dev.yml up --build

# Services available:
# - Backend: http://localhost:3000
# - Frontend: http://localhost:5173
# - Redis: localhost:6379
```

### Production

```bash
# Start production stack
docker-compose up --build

# Application available:
# - Full app: http://localhost:3000
# - UI: http://localhost:3000/ui/
```

### Available Scripts

```bash
# Build
yarn build                    # Build backend + frontend
yarn build:frontend          # Build frontend only

# Development
yarn dev                     # Start backend (dev mode)
yarn dev:frontend           # Start frontend (dev mode)
yarn dev:all                # Start both simultaneously

# Production
yarn start                   # Start backend (prod mode)
yarn start:backend          # Start compiled backend
yarn start:prod             # Build + start production

# Docker
yarn docker:build           # Build Docker image
yarn docker:dev             # Start development stack
yarn docker:prod            # Start production stack
yarn docker:stop            # Stop all containers

# Utilities
yarn lint                   # Lint code
yarn format                 # Format code
yarn type-check             # TypeScript type checking
```

## 🔔 Notification Engines

### ntfy.sh

Free, simple push notifications.

**Configuration**:

- Engine: `ntfy`
- Endpoint: `https://ntfy.sh/your-topic`

**Example**: `https://ntfy.sh/tmars-player-notifications`

### Gotify

Self-hosted notification server.

**Configuration**:

- Engine: `gotify`
- Endpoint: `https://your-server.com/message?token=YOUR_TOKEN`

**Example**: `https://gotify.example.com/message?token=AbCdEf123456`

### Discord

Rich notifications via Discord webhooks.

**Setup**:

1. Go to your Discord server settings
2. Navigate to "Integrations" > "Webhooks"
3. Create a new webhook or use an existing one
4. Copy the webhook URL

**Configuration**:

- Engine: `discord`
- Endpoint: `https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN`

**Example**: `https://discord.com/api/webhooks/123456789012345678/AbCdEfGhIjKlMnOpQrStUvWxYz...`

**Features**:

- Rich embed messages with Mars theme colors
- Player information display
- Timestamp and footer branding
- Custom avatar and username

## 🏃‍♂️ How It Works

1. **Monitoring**: The system polls TMars API every 5 seconds for game status
2. **Status Tracking**: Player statuses are cached in Redis to detect changes
3. **Notifications**: When a player's turn arrives (status changes to "GO"), a notification is sent
4. **Configuration**: Users configure their notification preferences via the web interface

## 🛠️ Development

### Project Structure

```
tmars-notifier/
├── src/                     # Backend source code
│   ├── config.ts           # Environment configuration
│   ├── index.ts            # Main server file
│   ├── notifications/      # Notification engines
│   ├── redis/              # Redis client
│   └── tmars/              # TMars API client
├── frontend/               # Vue.js frontend
│   ├── App.vue            # Main application component
│   ├── main.js            # Frontend entry point
│   └── index.html         # HTML template
├── dist/                   # Built files
├── docker-compose.yml      # Production Docker config
├── docker-compose.dev.yml  # Development Docker config
├── Dockerfile             # Multi-stage Docker build
└── vite.config.js         # Vite configuration
```

### Adding New Notification Engines

1. Create a new file in `src/notifications/`
2. Implement the required interface:
   ```typescript
   export async function setEndpoint(userName: string, endpoint: string): Promise<void>
   export async function getEndpoint(userName: string): Promise<string | null>
   export async function sendNotification(userName: string, message: string): Promise<void>
   ```
3. Register the engine in `src/notifications/index.ts`
4. Update the frontend dropdown options

## 🚨 Troubleshooting

### Common Issues

**Port already in use**:

```bash
lsof -i :3000
lsof -i :5173
```

**Docker build fails**:

```bash
docker-compose down
docker-compose build --no-cache
```

**Frontend not loading**:

- Check if `PRODUCTION_URL` is set correctly
- Verify build output in `dist/frontend/`
- Check CORS configuration

**Notifications not working**:

- Test API endpoints manually
- Verify Redis connection
- Check notification engine configuration

### Logs

```bash
# Docker logs
docker-compose logs -f

# Specific service logs
docker-compose logs -f notifier
docker-compose logs -f frontend
docker-compose logs -f redis
```

## 📄 License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Terraforming Mars](https://www.fryxgames.se/games/terraforming-mars/) game by FryxGames
- [ntfy.sh](https://ntfy.sh/) for simple notifications
- [Gotify](https://gotify.net/) for self-hosted notifications
