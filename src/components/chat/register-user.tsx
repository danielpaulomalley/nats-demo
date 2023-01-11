import React, { ChangeEvent, useEffect, useState } from "react"
import styled from "styled-components"

interface RegProps {
  onRegister: (name: string) => void
}


const RegisterUser = (props: RegProps) => {
  const [name, setName] = useState("")

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }
  const registerUser = () => {
    props.onRegister(name)
  }
  return (
    <Wrapper>
      <input onChange={handleNameChange} value={name} placeholder="enter name"/>
      <button onClick={registerUser} disabled={!name}>Go Chat!</button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

export default RegisterUser