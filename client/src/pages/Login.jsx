import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";

function Login() {
  const { login, isLoggingIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    login(formData);
  }
  return (
    <>
      <div className="bg-homepage-bg bg-cover bg-center min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 text-white w-[350px] md:w-[400px] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center gap-2 transition-all duration-300"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
