# Frontend Vue.js pour TMars Notifier

Ce frontend permet de configurer facilement vos notifications pour Terraforming Mars.

## Fonctionnalités

- 🔧 Configuration des notifications (ntfy.sh ou Gotify)
- 🧪 Test des notifications
- 🎨 Interface moderne et responsive
- 📱 Compatible mobile

## Développement

### Démarrer le développement

```bash
# Démarrer le backend et le frontend en parallèle
yarn dev:all

# Ou séparément :
yarn dev          # Backend uniquement
yarn dev:frontend # Frontend uniquement
```

### Build de production

```bash
# Build complet (backend + frontend)
yarn build

# Build frontend uniquement
yarn build:frontend
```

## Configuration

Le frontend utilise un proxy pour communiquer avec l'API backend :

- Frontend : http://localhost:5173
- Backend : http://localhost:3000

## Utilisation

1. Ouvrez http://localhost:5173 dans votre navigateur
2. Configurez vos notifications :
   - Entrez votre nom d'utilisateur TMars
   - Sélectionnez le type de notification (ntfy.sh ou Gotify)
   - Entrez l'URL de votre endpoint
3. Testez vos notifications avant de les sauvegarder

## Types de notifications supportés

### ntfy.sh

- URL format : `https://ntfy.sh/votre-topic`
- Gratuit et simple à utiliser
- Pas d'installation requise

### Gotify

- URL format : `https://votre-serveur.com/message?token=VOTRE_TOKEN`
- Auto-hébergé
- Plus de contrôle et de sécurité
