// components/Navbar.jsx
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // or use navigate
  };
  
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">QuizApp</Link>
      <div className="space-x-4 hidden md:flex">
        <Link to="/quizzes" className="hover:text-blue-500">Quizzes</Link>
        <Link to="/create" className="hover:text-blue-500">Create Quiz</Link>
        <Link to="/login" className="hover:text-blue-500">Login</Link>
        <button onClick={handleLogout} className="hover:text-blue-500">Logout</button>
      </div>
      <div className="md:hidden">
        <UserCircleIcon className="h-6 w-6 text-blue-600" />
      </div>
    </nav>
  );
};

export default Navbar;
