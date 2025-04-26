// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";
import { Api } from "../api/api"; 
import QuizCard from "../components/QuizCard";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await Api.get("/quizzes");
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-white px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <AcademicCapIcon className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
          Test Your Knowledge with <span className="text-blue-600">QuizApp</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Take fun and challenging quizzes, track your scores, and improve your skills with our interactive quiz platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            to="/quizzes"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
          >
            Explore Quizzes
          </Link>
          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl text-lg hover:bg-blue-50 transition"
          >
            Login / Register
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => <QuizCard key={quiz._id} quiz={quiz} />)
          ) : (
            <p className="text-gray-600">No quizzes available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
