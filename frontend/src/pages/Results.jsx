// src/pages/Results.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Results = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("quizResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  if (!result) return <div className="text-center mt-10">Loading results...</div>;

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>

        <p className="text-lg text-gray-700 mb-2">
          You scored <span className="text-blue-600 font-semibold">{result.score}</span> out of{" "}
          <span className="text-blue-600 font-semibold">{result.totalQuestions}</span>
        </p>

        <div className="flex gap-4 justify-center mt-6">
          <Link
            to="/quizzes"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Take Another Quiz
          </Link>

          <Link
            to="/"
            className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
