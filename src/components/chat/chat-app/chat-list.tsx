import React, { useState } from "react"
import styled from "styled-components"
import { ChatMessageData } from "./chat-app"

interface ChatListProps {
  onChatSelected: (id: string) => void
  chats: {[chat: string]: ChatMessageData}
  selectedChat: string
}

const ChatList = (props: ChatListProps) => {

  const selectChat = (id: string) => {
    props.onChatSelected(id)
  }

  return (
    <Wrapper>
      {Object.entries(props.chats).map(([key, val]) => {
        let cName = "chat-div"
        let msgCount
        if (key == props.selectedChat) cName += " selected-chat"
        else if (val.unreadMessageCount) {
          cName += " has-new-messages"
          msgCount = <span>{val.unreadMessageCount > 9 ? "9+" : val.unreadMessageCount}</span>
        }
        return (
          <div key={key} onClick={() => selectChat(key)} className={cName}>
            <div className="chat-name">{val.chatName}</div>
            <div className="msg-count">{msgCount}</div>
          </div>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .chat-div {
    cursor: pointer;
    display: flex;
    padding: 5px;
    &.selected-chat {
      background: #007;
      font-weight: bold;
      color: #CCC;
    }
    &.has-new-messages { font-weight: bold; }

    .chat-name {
      flex-grow: 1;
    }
    .msg-count {
      width: 30px;
      span {
        display: inline-block;
        background: pink;
        padding: 5px;
        border-radius: 3px;
      }
    }
  }


`

export default ChatList