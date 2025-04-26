// components/QuizCard.jsx


import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  return (
    <div className="border p-4 rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{quiz.title}</h2>
      <p className="text-gray-600">{quiz.description}</p>
      <Link
        to={`/quiz/${quiz._id}`}
        className="text-blue-500 hover:underline mt-4 block"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizCard;
