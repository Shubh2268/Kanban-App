import React, { useState, useEffect } from "react";
import Column from "./Column";
import TaskForm from "./TaskForm";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

const Board = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // Load tasks from local storage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("kanbanTasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task to "To Do" category
  const addTask = (task) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, task],
    }));
  };

  // Delete task from a specific category
  const deleteTask = (taskId, category) => {
    setTasks((prevTasks) => {
      const updatedTasks = {
        ...prevTasks,
        [category]: prevTasks[category].filter((task) => task.id !== taskId),
      };
      localStorage.setItem("kanbanTasks", JSON.stringify(updatedTasks)); // Update local storage
      return updatedTasks;
    });
  };

  // Handle drag-and-drop movement
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
      // Reorder within the same category
      const oldIndex = tasks[sourceCategory].findIndex((t) => t.id === active.id);
      const newIndex = tasks[destCategory].findIndex((t) => t.id === over.id);

      setTasks((prev) => ({
        ...prev,
        [sourceCategory]: arrayMove(prev[sourceCategory], oldIndex, newIndex),
      }));
    }
  };

  return (
    <div className="p-4">
      <TaskForm addTask={addTask} />
      <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
        <SortableContext items={[...tasks.todo, ...tasks.inProgress, ...tasks.done]}>
          <div className="flex gap-4">
            <Column title="To Do" tasks={tasks.todo} category="todo" deleteTask={deleteTask} />
            <Column title="In Progress" tasks={tasks.inProgress} category="inProgress" deleteTask={deleteTask} />
            <Column title="Done" tasks={tasks.done} category="done" deleteTask={deleteTask} />
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Board;
