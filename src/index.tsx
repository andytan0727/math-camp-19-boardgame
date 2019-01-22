import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import store from "./store";
import "./index.css";
import Game from "./Game";
import * as serviceWorker from "./serviceWorker";

const rootNode = document.getElementById("root") as HTMLDivElement;

const render = (): void => {
  ReactDOM.render(
    <Provider store={store}>
      <Game />
    </Provider>,
    rootNode
  );
};

// Hot reload (Reload modules without full reload)
if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.unmountComponentAtNode(rootNode);
    render();
  });
}

// Initial DOM rendering
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
