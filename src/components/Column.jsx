import React from "react";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ title, tasks, category, deleteTask }) => {
  const { setNodeRef } = useDroppable({ id: category, data: { category } });

  const columnStyles = {
    todo: "bg-blue-50 border-blue-300",
    inProgress: "bg-yellow-50 border-yellow-300",
    done: "bg-green-50 border-green-300",
  };

  const icons = {
    todo: "📝",
    inProgress: "⏳",
    done: "✅",
  };

  return (
    <div
      ref={setNodeRef}
      className={`w-1/3 p-4 rounded-lg shadow-md border-2 ${columnStyles[category]}`}
    >
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        {icons[category]} {title}
      </h2>
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
