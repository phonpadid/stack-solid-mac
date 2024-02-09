import { HashRouter } from "@solidjs/router";
import 'flowbite';
import { type Component } from "solid-js";
import routes from "./router";

const App: Component = () => {
  return (
    <>
      <HashRouter>{routes}</HashRouter>
    </>
  );
};

export default App;
