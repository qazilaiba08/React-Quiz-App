import express from "express";
const router = express.Router();

import authController from '../controller/authController.js'; 
import {authenticate, adminOnly } from "../middleweare/auth.js";

// AUTH Routes
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser ,{"token": "jwt-token-here",
  "isAdmin": true});

// // User routes
// router.get("/quizzes", getAllUsers);
// router.delete("/user/:id", deleteUser);
// router.put("/user/:id", updateUser);

// Admin check
router.get("/isAdmin", authenticate, adminOnly);

export default router;
