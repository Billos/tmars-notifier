import path from "path"

import express from "express"

import { env } from "./config"
import { assertNotificationEngine, sendNotification, setNotificationEndpoint, setNotificationEngine } from "./notifications/index"
import { redis } from "./redis"
import { TmarsApi } from "./tmars"
import { SimplePlayerModel } from "./tmars/types/SimpleGameModel"

const tmarsApi = new TmarsApi()
const app = express()

app.listen(env.port, () => {
  console.log(`Server is running on http://localhost:${env.port}`)
})

app.use(express.json())

// Servir les fichiers statiques du frontend sur /ui
app.use("/ui", express.static(path.join(__dirname, "../dist/frontend")))

// Routes API avec préfixe /api
app.get("/api/participants", async (_req, res) => {
  const participants = await tmarsApi.listParticipants()
  return res.json(participants)
})

app.get("/api/notification/set/:engine", async (req, res) => {
  const { engine } = req.params
  const { username, endpoint } = req.query
  if (typeof username !== "string" || typeof endpoint !== "string") {
    return res.status(400).send("Invalid query parameters")
  }

  if (!assertNotificationEngine(engine)) {
    return res.status(400).send("Invalid engine type")
  }

  console.log(`Setting notification engine for user: ${username}, engine: ${engine}`)
  await setNotificationEngine(username, engine)
  if (endpoint) {
    console.log(`Setting notification endpoint for user: ${username}, endpoint: ${endpoint}`)
    await setNotificationEndpoint(username, endpoint)
  }
  return res.sendStatus(200)
})

app.get("/api/notification/test", async (req, res) => {
  console.log("Testing notification endpoint")
  const { username } = req.query
  if (typeof username !== "string") {
    return res.status(400).send("Invalid query parameter")
  }
  await sendNotification(username, "Test notification from Tmars bot")
  return res.sendStatus(200)
})

// Route pour servir l'application Vue.js sur /ui/*
app.get("/ui/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist/frontend/index.html"))
})

async function init() {
  const games = await tmarsApi.games()

  for (const { gameId } of games) {
    const game = await tmarsApi.game(gameId)
    for (const user of game.players) {
      setInterval(async () => check(user), 5000)
    }
  }
}

async function check(user: SimplePlayerModel) {
  const currentStatus = await redis.get(`tmars:${user.id}:status`)
  const { result } = await tmarsApi.waitingFor(user.id)
  if (currentStatus !== result) {
    await redis.set(`tmars:${user.id}:status`, result)
    if (result === "GO") {
      console.log(`User ${user.name} is ready to play!`)
      await sendNotification(user.name, "Your turn to play!")
    }
  }
}

init()
