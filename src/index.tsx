import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./components/app";
import ChatDemo from "./components/chat/chat";
import PubSubDemo from "./components/pub-sub/pub-sub";

const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="/pubsub" element={<PubSubDemo/>}/>
          <Route path="/chat" element={<ChatDemo/>}/>
        </Route>
      </Routes>
    </HashRouter>
  )
}
ReactDOM.createRoot(document.getElementById("root")!).render(<Root/>)
/*const Root = () => {
  const [nc, setConnection] = useState(undefined)
  useState(() => {
    if (!nc) {
      connect({servers: "ws://nats-ws.amag.dev"})
      //connect({servers: "ws://10.10.100.51:9090"})
        .then((nc) => {
          //setConnection(nc)
        })
        .catch((e) => {
          console.log(e.chainedError)
          console.log("could not connect")
        })
    }
  })
  return (
    <div>
      hello
    </div>
  )
}
ReactDOM.createRoot(document.getElementById("root")!).render(<Root/>)*/