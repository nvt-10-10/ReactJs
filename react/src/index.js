import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux-slice/store";
import App from "./App"; // Import App component
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App /> {/* Render App component */}
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
