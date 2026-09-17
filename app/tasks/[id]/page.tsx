import Link from "next/link";

export default async function TaskDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let todo: { todo: string; completed: boolean; userId: number } | null = null;

  try {
    const res = await fetch(`https://dummyjson.com/todos/${id}`);
    if (res.ok) todo = await res.json();
  } catch {
    todo = null;
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <Link href="/tasks" className="text-blue-600 underline">← Back</Link>

      {!todo ? (
        <p className="text-red-600 mt-4">Task not found.</p>
      ) : (
        <div className="mt-4 space-y-2">
          <h1 className="text-xl font-bold">{todo.todo}</h1>
          <p>Completed: {todo.completed ? "Yes" : "No"}</p>
          <p>User ID: {todo.userId}</p>
        </div>
      )}
    </main>
  );
}