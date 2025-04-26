// src/pages/Admin.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/"); // Not admin? Redirect to Home
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Admin Dashboard</h1>

        <div className="flex flex-col space-y-4">
          <Link
            to="/create-quiz"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-600 transition"
          >
            ➕ Create New Quiz
          </Link>

          <Link
            to="/manage-quizzes"
            className="bg-green-500 text-white py-3 px-6 rounded-lg text-center hover:bg-green-600 transition"
          >
            🛠 Manage Existing Quizzes
          </Link>

          <Link
            to="/leaderboard"
            className="bg-purple-500 text-white py-3 px-6 rounded-lg text-center hover:bg-purple-600 transition"
          >
            🏆 View Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
