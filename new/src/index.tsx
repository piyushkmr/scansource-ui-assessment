import ReactDOM from 'react-dom';
import React from 'react';
import { App } from "./App";

const mountReact = () => {
  ReactDOM.render(<App />, document.getElementById('new'));
}

window.addEventListener("load", () => {
  mountReact();
});
