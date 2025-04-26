import express from 'express';
import { authenticate, adminOnly } from '../middleweare/auth.js';
import quizController from '../controller/quizController.js'; 

const router = express.Router();

// QUIZ Routes
router.post('/quizzes', authenticate, adminOnly, quizController.createQuiz); // Create Quiz (admin only)
router.get('/quizzes', quizController.getAllQuizzes);                    // Get All Quizzes
router.get('/quizzes/:id', quizController.getQuizById);                  // Get Quiz by ID (for users)
router.get('/quizzes/:id/admin', authenticate, adminOnly, quizController.getQuizByIdAdmin); // Get Quiz by ID (admin)

router.put('/quizzes/:id', authenticate, adminOnly, quizController.updateQuiz); // Update Quiz (admin)
router.delete('/quizzes/:id', authenticate, adminOnly, quizController.deleteQuiz); // Delete Quiz (admin)

router.get('/quizzes/:id/questions', quizController.getQuizQuestions); // Get Quiz Questions
router.post('/quizzes/:id/submit', quizController.submitQuiz);         // Submit Quiz Answers

// RESULTS (Optional)
router.get('/quizzes/:id/result', quizController.getResult);

// New Admin Create Quiz Route
router.post('/quizzes/create', authenticate, adminOnly, quizController.createQuiz); // Admin Create Quiz

export default router;