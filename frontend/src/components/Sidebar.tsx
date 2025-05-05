interface SidebarProps {
  prompts: {
    id: string;
    prompt: string;
    filename: string;
  }[];
}

export default function Sidebar({ prompts }: SidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen p-6 overflow-y-auto shadow-sm">
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors mb-6"
        onClick={() => (window.location.href = "/")}
      >
        New Video
      </button>

      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Previous Prompts
      </h2>

      <ul className="space-y-2">
        {prompts.map((p) => (
          <li
            key={p.id}
            className="cursor-pointer px-3 py-2 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => {
              window.location.href = `/chat/${p.id}`;
            }}
          >
            {p.prompt.length > 50 ? p.prompt.slice(0, 50) + "..." : p.prompt}
          </li>
        ))}
      </ul>
    </aside>
  );
}
