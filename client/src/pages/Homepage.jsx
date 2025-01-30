import { useNavigate } from 'react-router-dom';
import chat_AI from "../assets/chat_AI.svg";
const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-homepage-bg bg-cover bg-center min-h-screen flex flex-col justify-center">
            {/* Main Heading */}
            <div className="text-center pt-2">
                <h1 className="text-5xl font-bold text-white tracking-wide ">
                    Chat-AI
                </h1>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 mt-12 px-8 lg:px-24">
                {/* Left Side - Image */}
                <div className="flex justify-center">
                    <img
                        src={chat_AI}
                        alt="AI Chat Illustration"
                        className="w-4/5 lg:w-3/4 rounded-xl shadow-lg"
                    />
                </div>
                {/* Right Side - Description */}
                <div className="text-white text-center lg:text-left space-y-6">
                    <h2 className="text-4xl font-semibold">
                        Welcome to <span className="text-purple-400">Chat-AI</span>
                    </h2>
                    <p className="text-lg leading-relaxed">
                        Discover the power of AI with Chat-AI, your personal assistant for conversations,
                        productivity, and much more. Join now and start your journey with smart interactions.
                    </p>
                    <div>
                        <button
                            onClick={() => navigate('/signup')}
                            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md text-lg transition-transform transform hover:scale-105 shadow-lg"
                        >
                            Get Started
                        </button>
                    </div>
                    <p className="text-m mt-4 font-semibold">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
