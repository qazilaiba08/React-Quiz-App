// src/pages/Register.jsx
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/outline";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.get("http://localhost:5000/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/quizzes");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <div className="flex items-center gap-2 justify-center">
          <UserPlusIcon className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Register</button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
