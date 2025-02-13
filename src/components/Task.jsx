import React, { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";

const Task = ({ task, category, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { id: task.id, category },
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const priorityColors = {
    Low: "bg-green-200 text-green-700",
    Medium: "bg-yellow-200 text-yellow-700",
    High: "bg-red-200 text-red-700",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : "none",
        transition: "transform 0.2s ease",
        transformStyle: "preserve-3d",
        opacity: isVisible ? 1 : 0,
      }}
      className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md cursor-pointer flex justify-between items-start gap-2 transition-all transform scale-100 hover:scale-105`}
    >
      <div className="flex-1">
        <h3 className="text-md font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
        <span
          className={`px-2 py-1 text-xs font-bold rounded-full mt-2 inline-block ${priorityColors[task.priority] || "bg-gray-200 text-gray-700"
            }`}
        >
          {task.priority} Priority
        </span>
      </div>

      <button
        onClick={() => deleteTask(task.id, category)}
        className="text-red-500 hover:text-red-700 text-lg transition-all"
      >
        ❌
      </button>
    </div>
  );
};

export default Task;
