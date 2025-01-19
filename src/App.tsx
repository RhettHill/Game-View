import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import * as React from "react";
import "./input.css";
import { GameProvider } from "./components/context/GameContex";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <React.StrictMode>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </React.StrictMode>
  );
};

export default App;
