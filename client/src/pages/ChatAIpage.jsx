import axios from "axios";
import { useState } from "react";
import { Send, Bot, Loader2, LogOut, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const [questions, setQuestions] = useState("");
    const [answer, setAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const generateAnswers = async () => {
        if (!questions.trim()) return;

        setIsLoading(true);
        setAnswer("Loading...");

        try {
            const response = await axios({
                url: import.meta.env.VITE_GEMINI_API_KEY,
                method: "post",
                data: {
                    "contents": [{
                        "parts": [{ "text": questions }]
                    }],
                },
            });
            setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
        } catch (error) {
            setAnswer("Sorry, there was an error generating the response.", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-homepage-bg bg-cover bg-center min-h-screen">
            {/* Navigation Bar */}
            <div className="absolute top-4 right-4">
                <button
                    className="flex items-center gap-2 text-white hover:bg-white/10 rounded-lg px-4 py-2 transition-colors"
                    onClick={logout}
                >
                    {/* <span className="text-sm font-medium">Logout</span> */}
                    <LogOut className="w-5 h-5" />
                </button>
                <button
                    className="flex items-center gap-2 text-white hover:bg-white/10 rounded-lg px-4 py-2 transition-colors"
                    onClick={() => { navigate("/profile") }}
                >
                    <User className="w-5 h-5" />
                </button>
            </div>

            <div className="flex flex-col items-center pt-16">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8 px-6 py-3 rounded-lg">
                    <Bot className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-white">AI Chat Bot</h1>
                </div>

                {/* Chat Container */}
                <div className="w-full max-w-2xl px-4">
                    {/* Question Input */}
                    <div className="bg-white/70 rounded-lg shadow-lg p-6">
                        <label htmlFor="que" className="block text-sm font-medium text-black mb-2">
                            Ask your question
                        </label>
                        <div className="relative">
                            <textarea
                                name="que"
                                id="que"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[120px] text-gray-800 bg-white/70 backdrop-blur-sm"
                                placeholder="Type your question here..."
                                onChange={(e) => setQuestions(e.target.value)}
                                value={questions}
                            />
                            <button
                                onClick={generateAnswers}
                                disabled={isLoading || !questions.trim()}
                                className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Answer Output */}
                    {answer && (
                        <div className="mt-6 bg-white/90 rounded-lg shadow-lg p-6">
                            <h2 className="text-sm font-medium text-gray-700 mb-2">Response</h2>
                            <div className="bg-white/75 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                                <pre className="whitespace-pre-wrap font-sans text-gray-800">
                                    {answer}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;