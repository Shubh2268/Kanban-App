import React from "react";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ title, tasks, category, deleteTask }) => {
  const { setNodeRef } = useDroppable({ id: category, data: { category } });

  return (
    <div ref={setNodeRef} className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task key={task.id} task={task} category={category} deleteTask={deleteTask} />
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">No tasks here</p>
        )}
      </div>
    </div>
  );
};

export default Column;
