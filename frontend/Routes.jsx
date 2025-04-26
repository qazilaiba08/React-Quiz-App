import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateQuiz from "./pages/CreateQuiz";
import QuizDetails from "./pages/QuizDetails";
import Leaderboard from "./pages/Leaderboard";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/create-quiz",
    element: (
      <ProtectedRoute adminOnly>
        <CreateQuiz />
      </ProtectedRoute>
    ),
  },
  { path: "/quiz/:id", element: <QuizDetails /> },
  { path: "/quiz/:id/leaderboard", element: <Leaderboard /> },
]);

export default router;
