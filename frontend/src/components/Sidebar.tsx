interface SidebarProps {
  prompts: {
    id: string;
    prompt: string;
    filename: string;
  }[];
}

export default function Sidebar({ prompts }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-100 border-r h-screen p-4 overflow-y-auto">
      <button
        className="bg-blue-500 text-white px-4 py-2 w-full rounded mb-4"
        onClick={() => (window.location.href = "/")}
      >
        New Animation
      </button>
      <h2 className="text-lg font-semibold mb-4">Previous Prompts</h2>
      <ul className="space-y-2">
        {prompts.map((p, idx) => (
          <li
            key={idx}
            className="cursor-pointer text-sm text-gray-700 p-2 rounded hover:bg-gray-200"
            onClick={() => {
              window.location.href = `/chat/${p.id}`;
            }}
          >
            {p.prompt.length > 50 ? p.prompt.slice(0, 50) + "..." : p.prompt}
          </li>
        ))}
      </ul>
    </div>
  );
}
