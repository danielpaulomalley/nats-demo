import React, { useEffect, useState } from "react"
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { SubscriptionMessage } from "../../models";

export interface MessagesMessage extends SubscriptionMessage {
  color: string
}

interface MessagesProps {
  messages: MessagesMessage[]
}

const Messages = (props: MessagesProps) => {
  //const { messages } = props
  const { messages } = props
  return (
    <Wrapper>
      {
        messages.map((m,i) => {
          const d = new Date(m.ts).toUTCString()
          const style = { background: m.color, color: tinycolor(m.color).isDark() ? "#EEE" : "#000" }
          return (
            <div key={i} className="message-div">
              <div className="message-header">
                <div>{d}</div>
                <div style={style} className="subscription-icon">{m.subscriptionSubject}</div>
              </div>
              <div className="grid-container">
                <div>subject:</div><div>{m.subject}</div>
                <div>message:</div><div>{m.message}</div>
              </div>
            </div>
          )
        })
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .message-div {
    margin-bottom: 10px;
    border: 1px solid #777;
    border-radius: 5px;
    padding: 5px;
  }
  .message-header {
    display: flex;
    justify-content: space-between;
    .subscription-icon {
      font-size: .8em;
      padding: 3px;
    }
    border-bottom: 1px solid #888;
    margin-bottom: 5px;
  }
  .grid-container {
    display: grid;
    grid-template-columns: 80px auto;
  }
`

const MessageRow = () => {

}

export default Messages