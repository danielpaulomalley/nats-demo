import { connect, NatsConnection, StringCodec } from "nats.ws";
import { Subject } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { PublishMessage, SubscriptionMessage } from "./models";

const sc = StringCodec()

type NATS_STATE = "connecting" | "connected" | "error"


class NATSServer {
  nc?: NatsConnection
  private state$ = new BehaviorSubject<NATS_STATE>("connecting")
  private _messageWatchers: {[key: string]: Subject<SubscriptionMessage>} = {}

  constructor() {
    console.log("constructed")
    connect({servers: "ws://nats-ws.amag.dev"})
      .then(n => {
        this.nc = n
        this.state$.next("connected")
      })
      .catch(e => {
        this.state$.next("error")
        console.error(e)
      })
  }

  getState() { return this.state$ }

  subscribe(subject: string) {
    if (!this.nc) throw new Error("not connected")
    if (!this._messageWatchers[subject]) {
      this._messageWatchers[subject] = new Subject<SubscriptionMessage>()
      this.nc.subscribe(subject, {
        callback: (err, msg) => {
          const m: SubscriptionMessage = {
            subject: msg.subject,
            subscriptionSubject: subject,
            message: sc.decode(msg.data),
            ts: Date.now()
          }
          this._messageWatchers[subject].next(m)
        }
      })
    }
    return this._messageWatchers[subject]
  }

  publish(msg: PublishMessage) {
    if (!this.nc) throw new Error("not connected")
    this.nc.publish(msg.subject, sc.encode(msg.message))
  }

  request() {

  }

  requestMany() {

  }

}

export default new NATSServer()