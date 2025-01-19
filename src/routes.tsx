// routes/Routes.tsx
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails"; // Default import

// Define the routes using `createBrowserRouter`
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: "Error",
  },
  {
    path: "/games/:id",
    element: <GameDetails />,
    errorElement: "Error",
  },
]);
