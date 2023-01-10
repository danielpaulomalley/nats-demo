import React, { useEffect, useState } from "react"
import styled from "styled-components";
import { PublishMessage } from "../../models";

interface PublishProps {
  onPublish: (msg: PublishMessage) => void
}

const Publish = (props: PublishProps) => {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [canPublish, setCanPublish] = useState(false)

  useEffect(() => {
    const canP = !!message && !!subject
    setCanPublish(canP)
  }, [message, subject])

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.currentTarget.value)
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value)
  }

  const publish = () => {
    props.onPublish({subject, message})

  }

  const clear = () => {
    setSubject("")
    setMessage("")
  }

  return (
    <Wrapper>
      <div>
        <input placeholder="subject" value={subject} onChange={handleSubjectChange}/>
      </div>
      <div>
        <textarea placeholder="message" value={message}
          onChange={handleMessageChange}></textarea>
      </div>
      <div>
        <button onClick={publish} disabled={!canPublish}>publish</button>
        <button onClick={clear}>clear</button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  >div {
    margin-bottom: 5px;
    padding: 5px;
  }
  input {
    width: 100%;
    padding: 0;
    margin: 0;
  }
  textarea {
    width: 100%;
    resize: none;
  }
`

export default Publish