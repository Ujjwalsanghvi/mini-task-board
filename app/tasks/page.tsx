import TaskBoard from "../components/TaskBoard";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

export default async function TasksPage() {
  let tasks: { id: number; title: string; status: "todo" | "done" }[] | null = null;

  try {
    const res = await fetch("https://dummyjson.com/todos?limit=10");
    if (!res.ok) throw new Error("Failed to fetch todos");

    const data: { todos: Todo[] } = await res.json();

    tasks = data.todos.map((todo) => ({
      id: todo.id,
      title: todo.todo,
      status: todo.completed ? ("done" as const) : ("todo" as const),
    }));
  } catch {
    tasks = null;
  }

  if (!tasks) return <p className="p-6 text-center text-red-600">Unable to load tasks.</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Mini Task Board</h1>
      <TaskBoard initialTasks={tasks} />
    </main>
  );
}