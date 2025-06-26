export type Notifier = {
  setEndpoint: (userName: string, endpoint: string) => Promise<void>
  getEndpoint: (userName: string) => Promise<string | null>
  sendNotification: (userName: string, message: string, link?: string | null) => Promise<void>
}
