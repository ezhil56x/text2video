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
<div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
  <Sidebar prompts={prompts} />

  <main className="flex-1 flex flex-col">

    <VideoPanel loading={loading} fileName={fileName} />
    <section className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <textarea
        className="w-full resize-none border border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your animation..."
        rows={4}
      />
      {!fileName && (
        <button
          onClick={generateVideo}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2 rounded-md transition-colors"
        >
          Generate
        </button>
      )}
    </section>
  </main>
</div>

  );
}

export default App;
