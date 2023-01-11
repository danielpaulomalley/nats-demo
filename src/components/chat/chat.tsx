import { Subscription } from "rxjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChatMessage, UserData } from "../../models";
import server from "../../nats-server"
import ChatApp, { ChatMessageData } from "./chat-app/chat-app";
import RegisterUser from "./register-user";
import { v4 as uuidv4 } from "uuid";

let AllChats: {[chat: string]: ChatMessageData} = {}
let SelectedChat = "all"
let UserMap: {[id: string]: string} = {}
const ChatDemo = () => {

  const [currentUser, setCurrentUser] = useState<UserData | undefined>(undefined)
  //const [users, setUsers] = useState<UserData[]>([])
  const [chats, setChats] = useState<{[chat: string]: ChatMessageData}>({"all": {id: "all", chatName: "all", messages: []}})
  const [selectedChat, setSelectedChat] = useState("all")

  useEffect(() => {
    if (!currentUser) {
      /*setTimeout(() => {
        registerUser("dan")
      }, 3000)*/
      return
    }

    AllChats = {"all": {id: "all", chatName: "all", messages: []}}
    SelectedChat = "all"
    UserMap = {}
    UserMap[currentUser.id] = currentUser.name

    const s = server.messageRecd$.subscribe(m => {
      switch (m.subscriptionSubject) {
        case 'chat.message.all': {
          const msg = JSON.parse(m.message) as ChatMessage
          if (msg.fromId == currentUser.id) return
          _addMessageToChat("all", msg)
          break
        }
        case 'chat.user_enter': {
          const user = JSON.parse(m.message) as UserData
          _addUser(user)
          break
        }
        case 'chat.user_leave': {
          console.log(123)
          const userId = m.message
          if (AllChats[userId]) {
            if (SelectedChat == userId) {
              SelectedChat = "all"
              setSelectedChat("all")
            }
            delete AllChats[userId]
            setChats({...AllChats})
          }
          break
        }
        case 'chat.get_users': {
          if (m.message != currentUser.id)
            server.publish(`chat.get_users.${m.message}`, JSON.stringify(currentUser))
          break
        }
        case `chat.get_users.${currentUser.id}`: {
          const user = JSON.parse(m.message) as UserData
          _addUser(user)
          break
        }
        case `chat.message.${currentUser.id}`: {
          const msg = JSON.parse(m.message) as ChatMessage
          _addMessageToChat(msg.fromId, msg)
          break
        }
      }
    })
    server.subscribe("chat.message.all")
    server.subscribe("chat.user_enter")
    server.subscribe("chat.user_leave")
    server.subscribe("chat.get_users")
    server.subscribe(`chat.message.${currentUser.id}`)
    server.subscribe(`chat.get_users.${currentUser.id}`)
    server.publish("chat.user_enter", JSON.stringify(currentUser))
    server.publish("chat.get_users", currentUser.id)
    return () => {
      s.unsubscribe()
      server.publish("chat.user_leave", currentUser.id)
      setTimeout(() => {
        server.reset()
      }, 500)
    }
  }, [currentUser])

  const _addUser = (user: UserData) => {
    if (!AllChats[user.id]) {
      UserMap[user.id] = user.name
      AllChats[user.id] = {chatName: user.name, id: user.id, messages: []}
      setChats({...AllChats})
    }
  }

  const _addMessageToChat = (id: string, msg: ChatMessage) => {
    const cht = AllChats[id]
    if (cht) {
      if (UserMap[msg.fromId]) msg.fromName = UserMap[msg.fromId]
      cht.messages.push(msg)
      if (SelectedChat != id)
        cht.unreadMessageCount = cht.unreadMessageCount ? cht.unreadMessageCount + 1 : 1
      setChats({...AllChats})
    } else console.log("unknown chat")
  }

  const registerUser = (name: string) => {
    setCurrentUser({ id: uuidv4(), name })
  }

  const handleChatSelected = (id: string) => {
    if (AllChats[id]) {
      SelectedChat = id
      AllChats[id].unreadMessageCount = 0
      setChats({...AllChats})
      setSelectedChat(SelectedChat)
    } else console.warn("unknown chat selected")
  }

  const handleMessageSend = (msg: string) => {
    if (!currentUser) throw "no current user"
    const m = {
      fromId: currentUser.id,
      message: msg,
      ts: Date.now()
    }
    _addMessageToChat(selectedChat, m)
    server.publish(`chat.message.${selectedChat}`, JSON.stringify(m))
  }

  const inner = currentUser ? (
      <ChatApp chats={chats} user={currentUser} selectedChat={selectedChat}
        onChatSelected={handleChatSelected} onMessageSend={handleMessageSend}/>
    ) :
    <RegisterUser onRegister={registerUser}/>
  return (
    <Wrapper>
      {inner}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
`

export default ChatDemo