import { useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import VideoPanel from './components/VideoPanel';

function App() {
  const [prompt, setPrompt] = useState('');
  const [prompts, setPrompts] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/generate', { prompt });
      setVideoUrl(res.data.videoUrl);
      setPrompts([prompt, ...prompts]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPrompt = (p: string) => {
    setPrompt(p);
  };

  return (
    <div className="flex h-screen">
      <Sidebar prompts={prompts} onSelect={handleSelectPrompt} />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <textarea
            className="w-full border p-2"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your animation..."
          />
          <button
            onClick={generateVideo}
            className="mt-2 bg-blue-500 text-white px-4 py-2"
          >
            Generate
          </button>
        </div>
        <VideoPanel loading={loading} videoUrl={videoUrl} />
      </div>
    </div>
  );
}

export default App;
