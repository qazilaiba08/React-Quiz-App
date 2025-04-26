// src/pages/Quizzes.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch quizzes when the component mounts
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/quizzes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token to headers
          },
        });
        setQuizzes(res.data);  // Assuming your API returns an array of quizzes
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Available Quizzes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800">{quiz.title}</h3>
              <p className="text-gray-600 mt-2">{quiz.description}</p>
              <div className="mt-4">
                <Link
                  to={`/quiz/${quiz._id}`}
                  className="text-white bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
