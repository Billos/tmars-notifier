import { join } from "path"

import axios, { AxiosInstance } from "axios"

import { env } from "../config"
import { Phase } from "./types/phase"
import { SimpleGameModel } from "./types/SimpleGameModel"
import { WaitingForModel } from "./types/WaitingForModel"

type GameId = string
type Games = {
  gameId: GameId
  participantIds: string[]
}[]

export class TmarsApi {
  private request: AxiosInstance = axios.create({
    baseURL: join(env.tmarsUrl, "api"),
    params: { serverId: env.tmarsToken },
  })

  public async games(): Promise<Games> {
    const result = await this.request.get<Games>("/games")
    return result.data
  }

  public async game(id: string): Promise<SimpleGameModel> {
    const result = await this.request.get<SimpleGameModel>("/game", { params: { id } })
    return result.data
  }

  public async listParticipants(): Promise<string[]> {
    const games = await this.games()
    const participants: Set<string> = new Set()

    for (const { gameId } of games) {
      const { players, phase } = await this.game(gameId)

      if (players.length <= 1) {
        console.log(`Game ${gameId} has only one player, skipping`)
        continue
      }

      if (phase == Phase.END) {
        console.log(`Game ${gameId} has ended, ignoring its participants`)
        continue
      }

      const names = players.map((p) => p.name)
      for (const name of names) {
        participants.add(name)
      }
    }

    return Array.from(participants.values())
  }

  public async waitingFor(id: string): Promise<WaitingForModel> {
    const result = await this.request.get<WaitingForModel>("/waitingfor", { params: { id } })
    return result.data
  }
}
