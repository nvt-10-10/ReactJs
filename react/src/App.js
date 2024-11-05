import React from "react";
import FocusInput from "./pages/MyComponent";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      Spp
      <Outlet></Outlet>
    </div>
  );
};

export default App;
  