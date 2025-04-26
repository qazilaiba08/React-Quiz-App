// src/pages/QuizDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizDetail = () => {
  const { quizId } = useParams();  // Get quiz ID from URL
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the quiz details when the component mounts
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token
          },
        });
        setQuiz(res.data);  // Store quiz data
      } catch (err) {
        setError(`Failed to load quiz. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Handle answer selection
  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  // Handle quiz submission
  
const handleSubmit = async () => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/quizzes/${quizId}/submit`,
      { answers }, // Send selected answers
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
       // Save the result data to local storage (or context/state)
       localStorage.setItem("quizResult", JSON.stringify(res.data));

       navigate("/results");  // Redirect to results page
     } catch (err) {
       console.error("Error submitting quiz:", err);
       alert("Failed to submit quiz. Try again.");
     }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{quiz.title}</h2>
        <p className="text-lg text-gray-600 mb-6">{quiz.description}</p>

        <div className="space-y-6">
          {quiz.questions.map((question) => (
            <div key={question._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">{question.text}</h3>

              <div className="mt-4 space-y-2">
                {question.options.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={`question-${question._id}-option-${option}`}
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswerChange(question._id, option)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`question-${question._id}-option-${option}`}
                      className="ml-2 text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
