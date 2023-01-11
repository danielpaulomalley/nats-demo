import React, { ChangeEvent, useState } from "react"
import styled from "styled-components"
import { ChatMessageData } from "./chat-app"


interface ChatWindowProps {
  chat: ChatMessageData
  onMessageSend: (msg: string) => void
}

const ChatWindow = (props: ChatWindowProps) => {
  const [message, setMessage] = useState("")

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key != "Enter" || e.shiftKey || !message) return
    e.preventDefault()
    handleSend()
  }

  const handleSend = () => {
    props.onMessageSend(message)
    setMessage("")
  }

  return (
    <Wrapper>
      <div className="messages-div">
        {props.chat.messages.map((m, i) => {
          const fName = m.fromName ?? ""
          const fTime = new Date(m.ts).toUTCString()
          return (
            <div key={i}>
              <div className="message-header">
                <span className="message-header-name">{fName}</span>
                <span className="message-header-time">{fTime}</span>
              </div>
              <div className="message-div">{m.message}</div>
            </div>
          )
        })}
      </div>
      <div className="send-div">
        <textarea value={message} onChange={handleMessageChange} onKeyDown={handleKeyDown}/>
        <div>
          <button disabled={!message} onClick={handleSend}>send</button>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .messages-div {
    flex-grow: 1;
    >div {
      .message-header {
        span { display: inline-block; margin: 5px; }
        .message-header-name { font-weight: bold; }
        .message-header-time { color: #888; font-size: .7em; }
      }
      .message-div {
        margin-left: 20px;
      }
    }
  }
  .send-div {
    height: 100px; border-top: 1px solid #000;
    display: flex;
    textarea {
      flex-grow: 1;
      resize: none;
      margin: 10px;
    }
    div {
      display: flex;
      align-items: flex-end;
      padding-right: 10px;
      padding-bottom: 10px;
    }
  }

`

export default ChatWindow