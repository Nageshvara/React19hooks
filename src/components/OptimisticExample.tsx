import { useState, useOptimistic } from "react";

async function submitTitle(formData: FormData) {
  const title = formData.get("title") as string;
  await new Promise((res) => setTimeout(res, 2000)); 
  if (title.toLowerCase() === "error") {
    throw new Error("Title cannot be 'error'");
  }
  return title;
}

export default function OptimisticExample() {
  const [title, setTitle] = useState("Welcome!");
  const [optimisticTitle, setOptimisticTitle] = useOptimistic(title);
  const [error, setError] = useState<string | null>(null);
  const pending = title !== optimisticTitle;

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setOptimisticTitle(formData.get("title") as string);

    try {
      const updatedTitle = await submitTitle(formData);
      setTitle(updatedTitle);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold">{optimisticTitle}</h1>
        {pending && <p className="text-blue-500">Updating...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <form action={handleSubmit} className="mt-4">
          <input
            name="title"
            type="text"
            placeholder="Change Title"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={pending}
            className={`w-full mt-4 py-2 text-white font-semibold rounded-lg ${
              pending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
