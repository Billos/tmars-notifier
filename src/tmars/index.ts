import { join } from "path"

import axios, { AxiosInstance } from "axios"

import { env } from "../config"
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

  public async waitingFor(id: string): Promise<WaitingForModel> {
    const result = await this.request.get<WaitingForModel>("/waitingfor", { params: { id } })
    return result.data
  }
}
