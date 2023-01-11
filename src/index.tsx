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
