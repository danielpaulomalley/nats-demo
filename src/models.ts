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

