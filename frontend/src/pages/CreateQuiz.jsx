// src/pages/CreateQuiz.jsx
import { useState } from "react";
import axios from "axios";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const quizData = { title, description, questions };
      await axios.post("http://localhost:5000/api/quizzes", quizData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccess(true);
      setError("");
      setTitle("");
      setDescription("");
      setQuestions([{ text: "", options: ["", "", "", ""], correctAnswer: "" }]);
    } catch (err) {
      console.error(err);
      setError("Failed to create quiz. Please try again.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create New Quiz</h2>

        {success && (
          <div className="text-green-600 text-center mb-4">
            Quiz created successfully!
          </div>
        )}
        {error && (
          <div className="text-red-600 text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quiz Title */}
          <div>
            <label className="block text-gray-700 font-semibold">Quiz Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Quiz Description */}
          <div>
            <label className="block text-gray-700 font-semibold">Quiz Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            ></textarea>
          </div>

          {/* Questions */}
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="border p-4 rounded-md mb-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Question {qIndex + 1}</h3>

              {/* Question Text */}
              <input
                type="text"
                placeholder="Question text"
                value={question.text}
                onChange={(e) => handleQuestionChange(qIndex, "text", e.target.value)}
                className="block w-full mb-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />

              {/* Options */}
              <div className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                ))}
              </div>

              {/* Correct Answer */}
              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-1">Correct Answer</label>
                <input
                  type="text"
                  placeholder="Must match one of the options exactly"
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                  required
                />
              </div>
            </div>
          ))}

          {/* Add Another Question Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={addQuestion}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Add Another Question
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
