export type PlayerId = `p${string}`

export type GameId = `g${string}`

export type SpectatorId = `s${string}`

export type ParticipantId = PlayerId | SpectatorId
