import React from "react"
import styled from "styled-components"
import { ChatMessage, UserData } from "../../../models"
import ChatList from "./chat-list"
import ChatWindow from "./chat-window"

export interface ChatMessageData {
  id: string
  chatName: string
  messages: ChatMessage[]
  lastViewedTS?: number
  unreadMessageCount?: number

}

interface ChatAppProps {
  user: UserData
  chats: {[chat: string]: ChatMessageData}
  selectedChat: string
  onChatSelected: (id: string) => void
  onMessageSend: (msg: string) => void
}

const ChatApp = (props: ChatAppProps) => {
  return (
    <Wrapper>
      <div className="chat-app-left">
        <ChatList
          onChatSelected={(id) => props.onChatSelected(id)}
          chats={props.chats} selectedChat={props.selectedChat}/>
      </div>
      <div className="chat-app-right">
        <ChatWindow chat={props.chats[props.selectedChat]}
          onMessageSend={(msg) => props.onMessageSend(msg)}/>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;

  .chat-app-left { width: 200px; border-right: 1px solid #000; }
  .chat-app-right { flex-grow: 1; }
`

export default ChatApp