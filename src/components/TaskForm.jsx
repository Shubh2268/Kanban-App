import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    addTask({ id: uuidv4(), title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className='mb-6 flex gap-3 items-center bg-gray-100 p-6 rounded-lg shadow-md'>
      <input
        type='text'
        placeholder='Task title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='p-2 border rounded w-1/4 focus:ring focus:ring-blue-300'
      />

      <input
        type='text'
        placeholder='Description (optional)'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='p-2 border rounded w-1/3 focus:ring focus:ring-blue-300'
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)} className='py-2 border rounded bg-gray-50'>
        <option value='High'>🔥High</option>
        <option value='Medium'>⚡Medium</option>
        <option value='Low'>💧Low</option> 
      </select>
      
      <button type='submit' className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded font-semibold active:scale-95 transition-all cursor-pointer'>Add Task</button>

      {error && <p className='text-red-500 text-sm'>{error}</p>}

    </form>
  );
};

export default TaskForm;
