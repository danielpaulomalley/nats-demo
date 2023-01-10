import React, { useEffect, useState } from "react";
import styled from "styled-components";
import server from "../../nats-server"
import Publish from "./publish";
import SubscribeComponent from "./subscribe";
import { Subscription } from "rxjs";
import Messages, { MessagesMessage } from "./messages";
import { PublishMessage } from "../../models";
import SubscriptionsComponent from "./subscriptions";

const colors = [
  "#FF0000", "#FC6404", "#FCD444", "#8CC43C", "#FC4444",
  "#029658", "#5BC0DE", "#6454AC", "#FC8C84", "#1ABC9C"
]

const PubSubDemo = () => {
  const [subs] = useState<Subscription[]>([])
  const [messages, setMessages] = useState<MessagesMessage[]>([])
  const [subscriptions, setSubscriptions] = useState<{key: string, color: string}[]>([])
  const [colorMap] = useState<{[key: string]: string}>({})
  useEffect(() => {
    return () => {
      console.log(subs.length)
      for (const s of subs) s.unsubscribe()
    }
  }, [subs])

  const publish = (msg: PublishMessage) => {
    server.publish(msg)
  }
/*
  const [subscribe] = useState(() => {
    return (subject: string) => {
      let c = ""
      if (colorMap[subject]) c = colorMap[subject]
      else {
        c = colors[Object.keys(colorMap).length % colors.length]
        colorMap[subject] = c
      }
      subscriptions.push({key: subject, color: c})
      setSubscriptions([...subscriptions])
      //setSubscriptions([...subscriptions, {key: subject, color: c}])
      subs.push(server.subscribe(subject).subscribe(msg => {
        const m = {...msg, color: colorMap[msg.subscriptionSubject]}
        messages.push(m)
        setMessages([...messages])
      }))
    }
  })
*/
  const subscribe = (subject: string) => {
    if (colorMap[subject]) return
    const c = colors[Object.keys(colorMap).length % colors.length]
    colorMap[subject] = c
    subscriptions.push({key: subject, color: c})
    setSubscriptions([...subscriptions])
    //setSubscriptions([...subscriptions, {key: subject, color: c}])
    subs.push(server.subscribe(subject).subscribe(msg => {
      const m = {...msg, color: colorMap[msg.subscriptionSubject]}
      messages.unshift(m)
      setMessages([...messages])
    }))
  }
  return (
    <Wrapper>

      <div className="outer">
        <div className="side-by-side">
          <div className="section">
            <h3>Publish</h3>
            <Publish onPublish={publish}></Publish>
          </div>
          <div className="section">
            <h3>Subscriptions</h3>
            <SubscriptionsComponent subscriptions={subscriptions}></SubscriptionsComponent>
            <SubscribeComponent onSubscribe={subscribe}></SubscribeComponent>
          </div>
        </div>
        <div className="section">
          <h3>Messages</h3>
          <Messages messages={messages}></Messages>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .outer {
    display: flex;
    flex-direction: column;
    .side-by-side {
      display: flex;
      >div { flex-grow: 1; }
    }
    h3 { padding: 0; margin: 0; margin-bottom: 5px; }
    .section {
      border: 1px solid #888;
      border-radius: 5px;
      padding: 5px;
      margin: 5px;
    }

  }
`

export default PubSubDemo