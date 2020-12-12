// import "./index.css";
import App from "./App.js";
import { registerServiceWorker } from "./sw-register.js";

ReactDOM.render(React.createElement(
  React.StrictMode,
  null,
  React.createElement(App, null)
), document.getElementById("root"));

//registerServiceWorker();