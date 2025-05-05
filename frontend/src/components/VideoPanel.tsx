interface VideoPanelProps {
  loading: boolean;
  fileName?: string;
}

export default function VideoPanel({ loading, fileName }: VideoPanelProps) {
  return (
    <div className="flex-1 p-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4 tracking-tight">
        {loading ? "Generating Video..." : "Welcome to the Video Generator!"}
      </h1>

      {loading ? (
        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
          <svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </div>
      ) : fileName ? (
        <video
          controls
          className="w-full max-w-3xl aspect-video rounded-md shadow-md border border-gray-200 dark:border-gray-700"
        >
          <source
            src={`http://localhost:8000/video/${fileName}`}
            type="video/mp4"
          />
        </video>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Start creating stunning 2D animations effortlessly.
        </p>
      )}
    </div>
  );
}
