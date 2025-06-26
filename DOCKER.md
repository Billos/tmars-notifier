# Docker Setup for TMars Notifier

Ce projet utilise Docker pour le déploiement et le développement, incluant le frontend Vue.js et le backend Node.js.

## 🏗️ Architecture

- **Backend Node.js/Express** : Port 3000
- **Frontend Vue.js** : Intégré dans le backend en production
- **Redis** : Base de données pour le cache et les configurations
- **Interface Web** : http://localhost:3000

## 🚀 Démarrage rapide

### Production

```bash
# Démarrer avec docker-compose
yarn docker:prod

# Ou directement
docker-compose up -d
```

L'application sera disponible sur http://localhost:3000

### Développement

```bash
# Démarrer en mode développement (backend + frontend + redis)
yarn docker:dev

# Ou directement
docker-compose -f docker-compose.dev.yml up --build
```

- **Backend** : http://localhost:3000
- **Frontend** : http://localhost:5173 (avec hot-reload)
- **Redis** : localhost:6379

## 🐳 Commandes Docker

```bash
# Build l'image
yarn docker:build

# Développement complet
yarn docker:dev

# Production
yarn docker:prod

# Build manuel
docker build -t tmars-notifier .

# Run manuel
docker run -p 3000:3000 --env-file .env tmars-notifier
```

## 📁 Structure Docker

```
.
├── Dockerfile              # Multi-stage build (frontend + backend)
├── docker-compose.yml      # Production avec Redis
├── docker-compose.dev.yml  # Développement avec hot-reload
└── .dockerignore           # Fichiers exclus du build
```

## ⚙️ Configuration

Créez un fichier `.env` avec vos variables d'environnement :

```env
# TMars API
TMARS_URL=https://terraforming-mars.herokuapp.com
TMARS_TOKEN=your-token

# Redis (optionnel en dev, requis en prod)
REDIS_URL=redis://redis:6379

# Server Configuration
PORT=3000
NODE_ENV=production
LOG_LEVEL=2

# Production URL (pour le frontend Vite)
PRODUCTION_URL=https://tmars-notifier.your-domain.com
```

### Variables d'environnement importantes

- **`PRODUCTION_URL`** : URL complète de votre application en production
  - Utilisée par Vite pour la configuration CORS et proxy
  - Par défaut : `https://tmars-notifier.your-domain.com`
  - Doit inclure le protocole (https://)

- **`TMARS_URL`** et **`TMARS_TOKEN`** : Configuration de l'API TMars
- **`REDIS_URL`** : URL de connexion Redis (requis en production)

## 🔧 Développement

Le mode développement utilise des volumes montés pour le hot-reload :

- **Backend** : Changements dans `src/` rechargent automatiquement
- **Frontend** : Changements dans `frontend/` rechargent automatiquement
- **Base de données** : Redis persistant avec volume

## 📦 Production

En production, le frontend est compilé et servi statiquement par le backend Express.

### Build multi-stage

1. **Stage 1** : Build du frontend Vue.js
2. **Stage 2** : Build du backend TypeScript
3. **Stage 3** : Image finale avec les assets compilés

### Optimisations

- Image Alpine Linux légère
- Utilisateur non-root pour la sécurité
- Health check intégré
- Cache des dépendances optimisé
- .dockerignore pour réduire la taille du contexte

## 🔍 Monitoring

Le container inclut un health check qui vérifie l'API `/api/participants` :

```bash
# Vérifier le statut
docker ps

# Voir les logs
docker-compose logs -f notifier

# Vérifier la santé
docker inspect --format='{{.State.Health.Status}}' <container-id>
```

## 🔔 Notifications Discord

Pour configurer Discord :

1. **Créer un webhook Discord** :
   - Paramètres du serveur → Intégrations → Webhooks
   - Créer un nouveau webhook
   - Copier l'URL du webhook

2. **Configurer dans l'interface** :
   - Type : `Discord`
   - Endpoint : `https://discord.com/api/webhooks/ID/TOKEN`

3. **Fonctionnalités** :
   - Messages enrichis avec thème Mars
   - Informations du joueur
   - Horodatage automatique

## 🚨 Troubleshooting

### Port déjà utilisé

```bash
# Vérifier les ports utilisés
lsof -i :3000
lsof -i :5173

# Arrêter les containers
docker-compose down
```

### Problèmes de permissions

```bash
# Reconstruire sans cache
docker-compose build --no-cache

# Nettoyer les volumes
docker-compose down -v
```

### Logs de debug

```bash
# Logs détaillés
docker-compose logs -f

# Entrer dans le container
docker-compose exec notifier sh
```
