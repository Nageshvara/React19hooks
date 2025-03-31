import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`w-full mt-4 py-2 text-white font-semibold rounded-lg transition-all ${
        pending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

function FormStatus() {
    const { pending, data, method } = useFormStatus();
    const formattedData = data ? Object.fromEntries(data.entries()) : null;
  
    return (
      <div role="status" className="mt-2 text-sm text-gray-600">
        {pending && <span>Submitting via {method}...</span>}
        {pending && formattedData && (
          <div className="mt-2">
            <span className="text-blue-500">Form Data:</span>
            <pre className="bg-gray-100 p-2 rounded-md">{JSON.stringify(formattedData, null, 2)}</pre>
            <span className="text-green-500">Last submission successful!</span>
          </div>
        )}
      </div>
    );
  }
  

export default function UseFormStatusComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      action={async (formData: FormData) => {
        await new Promise((res) => setTimeout(res, 2000));
        console.log(formData)
      }}
      className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      method="post"
    >
      <label className="block text-gray-700 font-medium mb-2">Username</label>
      <input
        name="username"
        type="text"
        placeholder="Enter username"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FormStatus />
      <SubmitButton />
    </form>
    </div>
  );
}

