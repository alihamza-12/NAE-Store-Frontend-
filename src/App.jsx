import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">
          Welcome to New Armeco Electronics
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Tailwind CSS installed and styled! Start writing your custom code
          here.
        </p>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/50 max-w-md mx-auto hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
          <p className="text-lg font-semibold text-gray-800">
            Ready for your content
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
