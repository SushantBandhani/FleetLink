export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-4 border border-red-300 bg-red-50">
      <p className="font-semibold text-red-600">Something went wrong:</p>
      <pre className="text-sm text-red-800">
        {error?.message || "Unknown error"}
      </pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
