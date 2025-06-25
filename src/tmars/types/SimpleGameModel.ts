import { Color } from "./Color"
import { GameOptionsModel } from "./GameOptionsModel"
import { Phase } from "./phase"
import { GameId, PlayerId, SpectatorId } from "./types"

export type SimpleGameModel = {
  activePlayer: Color
  id: GameId
  phase: Phase
  players: Array<SimplePlayerModel>
  spectatorId: SpectatorId | undefined
  gameOptions: GameOptionsModel
  lastSoloGeneration: number
  expectedPurgeTimeMs: number
}

export type SimplePlayerModel = {
  color: Color
  id: PlayerId
  name: string
}
