import React from "react"
import styled from "styled-components"
import { ChatMessage } from "../../../models"

export interface ChatMessageData {
  chatName: string
  messages: ChatMessage[]
}

interface ChatAppProps {
  chats: {[chat: string]: ChatMessageData}
}

const ChatApp = (props: ChatAppProps) => {
  return (
    <Wrapper>

    </Wrapper>
  )
}

const Wrapper = styled.div`
`

export default ChatApp