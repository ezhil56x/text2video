interface VideoPanelProps {
  loading: boolean;
  fileName: string;
}

export default function VideoPanel({ loading, fileName }: VideoPanelProps) {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">Generated Video</h1>
      {loading ? (
        <div className="text-blue-500 font-medium">Generating video...</div>
      ) : fileName ? (
        <video controls className="w-full max-w-xl">
          <source src={`http://localhost:8000/video/${fileName}`} type="video/mp4" />
        </video>
      ) : (
        <p className="text-gray-500">No video generated yet.</p>
      )}
    </div>
  );
}
