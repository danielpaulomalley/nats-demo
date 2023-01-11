import { connect, Msg, NatsConnection, StringCodec } from "nats.ws";
import { Subject } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { PublishMessage, SubscriptionMessage } from "./models";

const sc = StringCodec()

type NATS_STATE = "connecting" | "connected" | "error"


class NATSServer {
  nc?: NatsConnection
  private state$ = new BehaviorSubject<NATS_STATE>("connecting")
  messageRecd$ = new Subject<SubscriptionMessage>()
  private _alreadyListening: {[key: string]: true} = {}
  constructor() {
    this._connect()
  }

  getState() { return this.state$ }

  subscribe(subject: string) {
    if (!this.nc) throw new Error("not connected")
    if (this._alreadyListening[subject]) return
    this._alreadyListening[subject] = true

    this.nc.subscribe(subject, {
      callback: (err, msg) => {
        const m: SubscriptionMessage = {
          subject: msg.subject,
          subscriptionSubject: subject,
          message: sc.decode(msg.data),
          ts: Date.now()
        }
        this.messageRecd$.next(m)
      }
    })
  }


  publish(subject: string, msg: string) {
    if (!this.nc) throw new Error("not connected")
    this.nc.publish(subject, sc.encode(msg))
  }

  request() {
    if (!this.nc) throw new Error("not connected")
    //this.nc.request().then((v) => {}, () => {})
    //this.nc.publish()

  }

  requestMany(subject: string, msg: string) {
    if (!this.nc) throw new Error("not connected")
    this.nc.requestMany(subject, sc.encode(msg), {maxWait: 1000}).then(v => {
      const x = v as any
      console.log(x.yields.length)
    })
  }

  reset() {
    if (!this.nc) throw new Error("not connected")
    this.state$.next("connecting")
    this._alreadyListening = {}
    this.nc.close()
      .then(() => {
        delete this.nc
        this._connect()
      })
      .catch((e) => {
        console.error(e)
        this.state$.next("error")
      })
  }

  private _connect() {
    if (this.nc) throw new Error("already connected")
    connect({servers: "wss://nats-ws.amag.dev"})
      .then(n => {
        this.nc = n
        this.state$.next("connected")
      })
      .catch(e => {
        this.state$.next("error")
        console.error(e)
      })
  }

}

export default new NATSServer()