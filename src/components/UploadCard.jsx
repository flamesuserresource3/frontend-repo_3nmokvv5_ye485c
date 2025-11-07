import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';

const UploadCard = () => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Idle');

  const onPick = () => inputRef.current?.click();

  const onChange = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
    setStatus('Ready');
  };

  const onUpload = async () => {
    if (!files.length) return;
    setStatus('Uploading');
    setProgress(10);

    // Simulate progress locally; backend wire-up can replace this
    const step = () => setProgress((p) => Math.min(95, p + Math.random() * 15));
    const timer = setInterval(step, 400);

    try {
      const form = new FormData();
      files.forEach((f) => form.append('files', f));

      const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const res = await fetch(`${backend}/api/upload/pdf`, { method: 'POST', body: form });
      if (!res.ok) throw new Error('Upload failed');
      await res.json();

      setProgress(100);
      setStatus('Processed');
    } catch (e) {
      console.error(e);
      setStatus('Error');
    } finally {
      clearInterval(timer);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">Upload & Analyze PDFs</h3>
          <p className="text-white/60 text-sm">Up to 25MB each. We’ll extract topics and build your knowledge base.</p>
        </div>
        <button onClick={onPick} className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 px-3 py-2 border border-white/10 text-white">
          <UploadCloud size={16} /> Choose Files
        </button>
        <input ref={inputRef} type="file" className="hidden" onChange={onChange} multiple accept="application/pdf" />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2 border border-white/10">
              <div className="flex items-center gap-2 text-white/80"><FileText size={16} /> {f.name}</div>
              <div className="text-white/50 text-xs">{(f.size/1024/1024).toFixed(2)} MB</div>
            </div>
          ))}
          <div className="mt-2">
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-2 flex items-center gap-2 text-white/70 text-sm">
              {status === 'Uploading' && <Loader2 className="animate-spin" size={14} />} {status}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={onUpload} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 px-3 py-2 text-white">
              Start Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCard;
