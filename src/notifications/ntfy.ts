import { redis } from "../redis"

export async function setEndpoint(userName: string, endpoint: string): Promise<void> {
  await redis.set(`ntfy:${userName}`, endpoint)
}

export async function getEndpoint(userName: string): Promise<string | null> {
  return redis.get(`ntfy:${userName}`)
}

export async function sendNotification(userName: string, message: string, link?: string | null): Promise<void> {
  const endpoint = await getEndpoint(userName)
  if (!endpoint) {
    return
  }

  // Convert the link into markdown format
  const mdLink = link ? `[Click here](${link})` : null

  console.log(`Sending Ntfy notification to ${userName} with message: ${message} and link: ${link} (endpoint: ${endpoint})`)

  await fetch(endpoint, {
    method: "POST",
    body: message + (mdLink ? `\n\n${mdLink}` : ""),
  })
}
