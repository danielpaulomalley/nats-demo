import React, { useEffect, useState } from "react"
import styled from "styled-components";

interface SubscribeProps {
  onSubscribe: (subject: string) => void
}

const SubscribeComponent = (props: SubscribeProps) => {
  const [subject, setSubject] = useState("")

  const [canSub, setCanSub] = useState(false)

  useEffect(() => {
    const canS = !!subject
    setCanSub(canS)
  }, [subject])

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.currentTarget.value)
  }

  const subscribe = () => {
    props.onSubscribe(subject)
    setSubject("")
  }

  return (
    <Wrapper>
      <input placeholder="subject" value={subject} onChange={handleSubjectChange}/>
      <div>
        <button onClick={subscribe} disabled={!canSub}>add subscription</button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default SubscribeComponent