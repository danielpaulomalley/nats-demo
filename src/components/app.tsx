import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components"
import server from "../nats-server"
import "../styles.scss"

const App = () => {
  const [state, setState] = useState("connecting")
  useEffect(() => {
    server.getState().subscribe(s => {
      setState(s)
    })
  }, [])

  let loadingDiv
  if (state != "connected") {
    loadingDiv = (
      <div className="nats-loading">Connecting</div>
    )
  }
  return (
    <Wrapper>
      <div className="app-nav-div">
        <NavLink to="/pubsub">
          Pub Sub
        </NavLink>
        <NavLink to="/chat">
          Chat
        </NavLink>
      </div>
      <div className="app-body-div">
        <Outlet/>
      </div>
      {loadingDiv}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .app-nav-div {
    border-bottom: 1px solid #000;
    a {
      display: inline-block;
      text-decoration: none;
      padding: 5px;
      color: inherit;
      &:hover { background: green; }
      &.active { background: green; }
    }
  }
  .app-body-div { flex-grow: 1; }
  .nats-loading {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .3);
  }
`

export default App