import { useActionState } from "react";

function submitAction(state: string[], formData: FormData) {
  const username = formData.get("username") as string;
  return [...state, username];
}

export default function BasicActionStateComponent() {
  const [state, formAction] = useActionState(submitAction, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form action={formAction} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Submit
          </button>
        </form>

        <h3 className="text-lg font-semibold mt-4">Submitted Usernames:</h3>
        <ul className="list-disc pl-6 mt-2">
          {state.map((user, index) => (
            <li key={index} className="text-gray-700">{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}