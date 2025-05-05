interface SidebarProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export default function Sidebar({ prompts, onSelect }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-100 border-r h-screen p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Previous Prompts</h2>
      <ul className="space-y-2">
        {prompts.map((p, idx) => (
          <li
            key={idx}
            className="cursor-pointer hover:underline text-sm text-gray-700"
            onClick={() => onSelect(p)}
          >
            {p.length > 50 ? p.slice(0, 50) + "..." : p}
          </li>
        ))}
      </ul>
    </div>
  );
}
