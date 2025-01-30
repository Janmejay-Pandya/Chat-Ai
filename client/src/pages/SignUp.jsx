import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader2 } from 'lucide-react';

function SignUp() {
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    signup(formData);
  }
  return (
    <>
      <div className="bg-homepage-bg bg-cover bg-center min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 text-white w-[350px] md:w-[400px] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name='name'
                onChange={handleChange}
                value={formData.name}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name='email'
                onChange={handleChange}
                value={formData.email}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name='phone'
                onChange={handleChange}
                value={formData.phone}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name='password'
                onChange={handleChange}
                value={formData.password}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center gap-2 transition-all duration-300"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
            <p className="text-m mt-4 font-semibold">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
