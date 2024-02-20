import { Router } from "@solidjs/router";
import "flowbite";
import { type Component } from "solid-js";
import { MessageProvider } from "./contexts/message/MessageContext";
import routes from "./router";

const App: Component = () => {
  return (
    <MessageProvider>
      <Router>{routes}</Router>
    </MessageProvider>
  );
};

export default App;
