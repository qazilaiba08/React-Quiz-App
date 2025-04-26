import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Quizzes from './pages/Quizzes';
import QuizDetails from './pages/QuizDetail';
import Result from './pages/Results';
import CreateQuiz from './pages/CreateQuiz';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quizzes" element={
  <PrivateRoute>
    <Quizzes />
  </PrivateRoute>
} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/admin/quizzes" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

// import { useEffect } from 'react'
// import './index.css'

// function App() {
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('http://localhost:5000/api')
//       const data = await response.text()
//       console.log(data)
//     }
//     fetchData()
//   }, []);
//   return (
//     <>
//       <div>
//         <h1 className="text-3xl font-bold underline">
//           Hello world!
//         </h1>
//         <p className="text-lg">This is a simple React app.</p>
//         <p className="text-lg">Check the console for data from the backend.</p>
//         <p className="text-lg">Make sure the backend is running on port 5000.</p>
//         <p className="text-lg">You can change the port in the backend code.</p>
//         <p className="text-lg">You can also change the API endpoint in the fetch call.</p>
//         <p className="text-lg">You can also change the API endpoint in the backend code.</p>
//         <p className="text-lg">You can also change the API endpoint in the backend code.</p>
//       </div>
//     </>
//   )
// }

// export default App
