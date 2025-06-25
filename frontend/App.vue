<template>
  <div class="app">
    <header class="header">
      <h1>🚀 TMars Notifier</h1>
      <p>Configurez vos notifications pour Terraforming Mars</p>
    </header>

    <main class="main">
      <div class="container">
        <!-- Configuration des notifications -->
        <div class="card">
          <h2>⚙️ Configuration des notifications</h2>

          <form @submit.prevent="saveConfiguration" class="form">
            <div class="form-group">
              <label for="username">Nom d'utilisateur</label>
              <select id="username" v-model="config.username" required>
                <option value="">Sélectionnez un participant</option>
                <option v-for="participant in participants" :key="participant" :value="participant">
                  {{ participant }}
                </option>
              </select>
              <small class="help-text" v-if="participantsLoading">Chargement des participants...</small>
              <small class="help-text" v-else-if="participants.length === 0">Aucun participant trouvé</small>
            </div>

            <div class="form-group">
              <label for="engine">Type de notification</label>
              <select id="engine" v-model="config.engine" required>
                <option value="">Sélectionnez un type</option>
                <option value="ntfy">ntfy.sh</option>
                <option value="gotify">Gotify</option>
              </select>
            </div>

            <div class="form-group">
              <label for="endpoint">URL d'endpoint</label>
              <input id="endpoint" v-model="config.endpoint" type="url" :placeholder="endpointPlaceholder" required />
              <small class="help-text">{{ endpointHelpText }}</small>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? "Enregistrement..." : "💾 Enregistrer la configuration" }}
            </button>
          </form>
        </div>

        <!-- Test des notifications -->
        <div class="card">
          <h2>🧪 Test des notifications</h2>
          <p>Testez si vos notifications fonctionnent correctement.</p>

          <form @submit.prevent="testNotification" class="form">
            <div class="form-group">
              <label for="testUsername">Nom d'utilisateur pour le test</label>
              <select id="testUsername" v-model="testConfig.username" required>
                <option value="">Sélectionnez un participant</option>
                <option v-for="participant in participants" :key="participant" :value="participant">
                  {{ participant }}
                </option>
              </select>
            </div>

            <button type="submit" class="btn btn-secondary" :disabled="testLoading">
              {{ testLoading ? "Envoi..." : "📤 Envoyer une notification de test" }}
            </button>
          </form>
        </div>

        <!-- Statut -->
        <div v-if="message" class="message" :class="messageType">
          {{ message }}
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue"

export default {
  name: "App",
  setup() {
    const config = ref({
      username: "",
      engine: "",
      endpoint: "",
    })

    const testConfig = ref({
      username: "",
    })

    const participants = ref([])
    const participantsLoading = ref(false)
    const loading = ref(false)
    const testLoading = ref(false)
    const message = ref("")
    const messageType = ref("")

    const endpointPlaceholder = computed(() => {
      switch (config.value.engine) {
        case "ntfy":
          return "https://ntfy.sh/votre-topic"
        case "gotify":
          return "https://gotify.example.com/message?token=VOTRE_TOKEN"
        default:
          return "URL de votre service de notification"
      }
    })

    const endpointHelpText = computed(() => {
      switch (config.value.engine) {
        case "ntfy":
          return "URL de votre topic ntfy.sh (ex: https://ntfy.sh/tmars-notifications)"
        case "gotify":
          return "URL de votre serveur Gotify avec le token d'application"
        default:
          return "Sélectionnez d'abord un type de notification"
      }
    })

    const showMessage = (text, type = "success") => {
      message.value = text
      messageType.value = type
      setTimeout(() => {
        message.value = ""
      }, 5000)
    }

    const fetchParticipants = async () => {
      participantsLoading.value = true
      try {
        const response = await fetch("/api/participants")
        if (response.ok) {
          const data = await response.json()
          participants.value = data
        } else {
          throw new Error("Erreur lors de la récupération des participants")
        }
      } catch (error) {
        showMessage("❌ Erreur lors de la récupération des participants", "error")
        console.error("Erreur:", error)
      } finally {
        participantsLoading.value = false
      }
    }

    const saveConfiguration = async () => {
      loading.value = true
      try {
        const response = await fetch(
          `/api/notification/set/${config.value.engine}?username=${encodeURIComponent(config.value.username)}&endpoint=${encodeURIComponent(config.value.endpoint)}`,
        )

        if (response.ok) {
          showMessage("✅ Configuration enregistrée avec succès !", "success")
        } else {
          throw new Error("Erreur lors de l'enregistrement")
        }
      } catch (error) {
        showMessage("❌ Erreur lors de l'enregistrement de la configuration", "error")
        console.error("Erreur:", error)
      } finally {
        loading.value = false
      }
    }

    const testNotification = async () => {
      testLoading.value = true
      try {
        const response = await fetch(`/api/notification/test?username=${encodeURIComponent(testConfig.value.username)}`)

        if (response.ok) {
          showMessage("✅ Notification de test envoyée !", "success")
        } else {
          throw new Error("Erreur lors de l'envoi du test")
        }
      } catch (error) {
        showMessage("❌ Erreur lors de l'envoi de la notification de test", "error")
        console.error("Erreur:", error)
      } finally {
        testLoading.value = false
      }
    }

    // Charger les participants au montage du composant
    onMounted(() => {
      fetchParticipants()
    })

    return {
      config,
      testConfig,
      participants,
      participantsLoading,
      loading,
      testLoading,
      message,
      messageType,
      endpointPlaceholder,
      endpointHelpText,
      saveConfiguration,
      testNotification,
      fetchParticipants,
    }
  },
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  color: white;
}

.header {
  text-align: center;
  padding: 3rem 1rem;
  background: rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.main {
  padding: 2rem 1rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.card h2 {
  margin-bottom: 1rem;
  color: #4a5568;
}

.form {
  display: grid;
  gap: 1.5rem;
}

.form-group {
  display: grid;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #2d3748;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.help-text {
  color: #718096;
  font-size: 0.875rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
}

.message {
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
}

.message.success {
  background: rgba(72, 187, 120, 0.9);
  color: white;
}

.message.error {
  background: rgba(245, 101, 101, 0.9);
  color: white;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .main {
    padding: 1rem;
  }

  .card {
    padding: 1.5rem;
  }
}
</style>
