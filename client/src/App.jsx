import Homepage from "./pages/Homepage.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/SignUp.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import ChatAIpage from "./pages/ChatAIpage.jsx"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import { Loader } from "lucide-react"

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return <>
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/chat-ai" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/chat-ai" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat-ai" element={authUser ? <ChatAIpage /> : <Navigate to="/login" />} />
      </Routes>
    </div>

  </>
}

export default App