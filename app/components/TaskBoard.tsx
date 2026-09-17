"use client";

import { useState } from "react";
import Link from "next/link";

type Task = {
  id: number;
  title: string;
  status: Status;
};

type Status = "todo" | "in-progress" | "done";

const statuses: Status[] = ["todo", "in-progress", "done"];
const statusLabels: Record<Status, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export default function TaskBoard({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");

  const move = (id: number, status: Status) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  const addTask = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setTasks((currentTasks) => [
      { id: Date.now(), title: trimmedTitle, status: "todo" },
      ...currentTasks,
    ]);
    setTitle("");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-center gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="New task..."
          className="w-64 rounded border border-gray-300 p-2"
        />
        <button onClick={addTask} className="rounded bg-blue-600 px-4 text-white">
          Add Task
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {statuses.map((status) => (
          <div key={status} className="rounded-lg border border-gray-300 bg-gray-100 p-3">
            <h2 className="mb-3 flex items-center justify-between border-b border-gray-300 pb-2 text-lg font-bold text-gray-900">
              <span>{statusLabels[status]}</span>
              <span className="rounded-full bg-gray-700 px-2 py-1 text-xs font-semibold text-white">
                {tasks.filter((task) => task.status === status).length}
              </span>
            </h2>

            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div key={task.id} className="mb-2 rounded bg-white p-2 shadow">
                  <Link href={`/tasks/${task.id}`} className="text-blue-600 underline">
                    {task.title}
                  </Link>
                  <p className="text-xs text-gray-500">Status: {statusLabels[task.status]}</p>

                  <div className="mt-1 flex flex-wrap gap-1">
                    {statuses
                      .filter((nextStatus) => nextStatus !== task.status)
                      .map((nextStatus) => (
                        <button
                          key={nextStatus}
                          onClick={() => move(task.id, nextStatus)}
                          className="rounded border border-gray-400 bg-gray-200 px-2 py-1 text-xs font-medium text-gray-900 hover:bg-gray-300"
                        >
                          Move to {statusLabels[nextStatus]}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}