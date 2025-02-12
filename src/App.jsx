import React, { useState } from "react";
import Board from "./components/Board";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-gray-100 min-h-screen"}>
      <div className="p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <Board />
    </div>
  );
}

export default App;
