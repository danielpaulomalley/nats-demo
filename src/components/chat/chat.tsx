import { Subscription } from "rxjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChatMessage, UserData } from "../../models";
import server from "../../nats-server"
import ChatApp, { ChatMessageData } from "./chat-app/chat-app";
import RegisterUser from "./register-user";
import { v4 as uuidv4 } from "uuid";


const ChatDemo = () => {
  const [subs] = useState<Subscription[]>([])
  const [user, setUser] = useState<UserData | undefined>(undefined)
  //const [users, setUsers] = useState<UserData[]>([])
  const [chats, setChats] = useState<{[chat: string]: ChatMessageData}>({"all": {chatName: "all", messages: []}})
  useEffect(() => {
    return () => {
      for (const s of subs) s.unsubscribe()
    }
  }, [subs])

  const registerUser = (name: string) => {
    const u = { id: uuidv4(), name }
    /*subs.push(server.subscribe("chat.message.all").subscribe(msg => {
      const m = JSON.parse(msg.message) as ChatMessage
      chats["all"].messages.unshift(m)
      setChats({...chats})
    }))
    subs.push(server.subscribe("chat.user_enter").subscribe(msg => {
      const user = JSON.parse(msg.message) as UserData
      if (!chats[user.id]) {
        chats[user.id] = {chatName: user.name, messages: []}
        setChats({...chats})
        //users.push(user)
        //setUsers([...users])
      }
    }))
    server.subscribe("chat.user_leave").subscribe(msg => {
      const userId = msg.message
      if (chats[userId]) {
        delete chats[userId]
        setChats({...chats})
      }
    })

    subs.push(server.subscribe("chat.get_users").subscribe(msg => {
      console.log(user)
    }))
    subs.push(server.subscribe(`chat.${u.id}`).subscribe(msg => {
      const m = JSON.parse(msg.message) as ChatMessage
      if (!chats[m.fromId]) return
      chats[m.fromId].messages.unshift(m)
      setChats({...chats})
    }))
    //server.publish({subject: "chat.new_user", message: {id}})*/
  }

  const inner = user ? <ChatApp chats={chats}></ChatApp> :
    <RegisterUser onRegister={registerUser}></RegisterUser>
  return (
    <Wrapper>
      {inner}
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

export default ChatDemo