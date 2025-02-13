import React, { useState } from 'react';
import Board from './components/Board';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-gray-100 min-h-screen'}>
      <div className='flex items-center justify-center p-5 bg-blue-100'>
        <h1 className='text-4xl font-bold'>Kanban Board</h1>
      </div>
      <Board />
    </div>
  );
}

export default App;
