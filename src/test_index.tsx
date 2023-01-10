import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import useWebSocket from 'react-use-websocket';

const Root = () => {
  useWebSocket('ws://nats-ws.amag.dev', {
    onOpen: () => {
      console.log("im opened")
    }, onClose: () => {

    }, onError: (e) => {
      console.log(e)
    }
  })
  return (
    <div>
      hello
    </div>
  )
}
ReactDOM.createRoot(document.getElementById("root")!).render(<Root/>)