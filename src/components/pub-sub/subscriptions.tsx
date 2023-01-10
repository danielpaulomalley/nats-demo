import React, { useEffect, useState } from "react"
import styled from "styled-components";
import tinycolor from "tinycolor2"


interface SubscriptionsProps {
  subscriptions: {key: string, color: string}[]
}

const SubscriptionsComponent = (props: SubscriptionsProps) => {
  return (
    <Wrapper>
      {
        props.subscriptions.map((s, i) => {
          const tc = tinycolor(s.color)
          const color = tc.isLight() ? "#000" : "#EEE"
          const st = {backgroundColor: s.color, color}
          return (
            <div key={i} style={st}>{s.key}</div>
          )
        })
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font-size: .8em;
  >div {
    padding: 3px 6px;
    margin: 3px;
    border: 1px solid #000;

  }
`

export default SubscriptionsComponent