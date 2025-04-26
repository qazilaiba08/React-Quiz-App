import Quiz from '../model/quiz.js'; // Assuming you have a Quiz model

// Create a new quiz (Admin only)
export const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    // Validate required fields
    if (!title || !description || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: 'All fields are required and questions must be an array.' });
    }

    // Create a new quiz
    const quiz = await Quiz.create({
      title,
      description,
      questions,
      createdBy: req.user.id, // Assuming `req.user` contains the authenticated user's info
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create quiz.' });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quizzes.' });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quiz.' });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title, description, questions },
      { new: true }
    );
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update quiz.' });
  }
};
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete quiz.' });
  }
};
export const getQuizQuestions = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    res.status(200).json(quiz.questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quiz questions.' });
  }
};
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    const correctAnswers = quiz.questions.map((question) => question.correctAnswer);
    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === correctAnswers[index] ? 1 : 0);
    }, 0);
    res.status(200).json({ score, totalQuestions: quiz.questions.length });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit quiz.' });
  }
}

export const getResult = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await
    Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    const result = {
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions,
    };
    res.status(200).json(result);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quiz result.' });
  }
}




export default {
  createQuiz,getAllQuizzes,getQuizById,
  updateQuiz,deleteQuiz,getQuizQuestions,submitQuiz,getResult
  
};