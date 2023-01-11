import { Msg } from "nats.ws"

export interface PublishMessage {
  subject: string
  message: string
}

export interface SubscriptionMessage {
  subscriptionSubject: string // key that you used to subscribe
  subject: string // actual subject
  message: string
  ts: number
}

export interface UserData {
  id: string
  name: string
}

export interface ChatMessage {
  fromId: string
  message: string
  ts: number
}