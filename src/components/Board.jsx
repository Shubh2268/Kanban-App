import React, { useState, useEffect } from 'react';
import Column from './Column';
import TaskForm from './TaskForm';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

const Board = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('kanbanTasks'));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addTask = (task) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, task],
    }));
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceCategory = active.data.current.category;
    const destCategory = over.data.current.category;

    if (sourceCategory !== destCategory) {
      const task = tasks[sourceCategory].find((t) => t.id === active.id);
      setTasks((prev) => ({
        ...prev,
        [sourceCategory]: prev[sourceCategory].filter((t) => t.id !== active.id),
        [destCategory]: [...prev[destCategory], task],
      }));
    } else {
      const oldIndex = tasks[sourceCategory].findIndex((t) => t.id === active.id);
      const newIndex = tasks[destCategory].findIndex((t) => t.id === over.id);
      setTasks((prev) => ({
        ...prev,
        [sourceCategory]: arrayMove(prev[sourceCategory], oldIndex, newIndex),
      }));
    }
  };

  return (
    <div className={`min-h-screen p-6 transition-all ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>

      <TaskForm addTask={addTask} />
      
      <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
        <SortableContext items={[...tasks.todo, ...tasks.inProgress, ...tasks.done]}>
          <div className='flex gap-4'>
            <Column title='To Do' tasks={tasks.todo} setTasks={setTasks} category='todo' />
            <Column title='In Progress' tasks={tasks.inProgress} setTasks={setTasks} category='inProgress' />
            <Column title='Done' tasks={tasks.done} setTasks={setTasks} category='done' />
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Board;
