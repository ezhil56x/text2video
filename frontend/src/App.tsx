import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import VideoPanel from './components/VideoPanel';

function App() {
  type Prompt = {
    id: string;
    prompt: string;
    filename: string;
  };

  const [prompt, setPrompt] = useState('');
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/generate', { prompt });
      setFileName(res.data.filename);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const path = window.location.pathname;
      const id = path.split('/').pop();

      if (id && id !== 'chat') {
        try {
          const res = await axios.get(`http://localhost:8000/chat/${id}`);
          setPrompt(res.data.prompt);
          setFileName(res.data.filename);
        } catch (e) {
          console.error(e);
        }
      }

      if (fileName) {
        try {
          const res = await axios.get(`http://localhost:8000/video/${fileName}`, {
            responseType: 'blob',
          });
          const url = URL.createObjectURL(new Blob([res.data]));
          const video = document.createElement('video');
          video.src = url;
          video.controls = true;
          document.body.appendChild(video);
        } catch (e) {
          console.error(e);
        }
      }
    };

    fetchData();
  }, [fileName]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:8000/history');
        setPrompts(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar prompts={prompts}/>
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
        <VideoPanel loading={loading} fileName={fileName} />
      </div>
    </div>
  );
}

export default App;
