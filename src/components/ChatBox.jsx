import React, { useEffect, useRef, useState } from 'react';
import { Send, Globe, Database, Zap } from 'lucide-react';

const ChatBox = () => {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! Ask me about your PDFs. Toggle web mode for enrichment.' }]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('local'); // 'local' | 'web'
  const listRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && (e.key === 'j' || e.key === 'J')) {
        setMode((m) => (m === 'local' ? 'web' : 'local'));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const q = input;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: q }]);

    const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    const url = `${backend}/api/chat/stream?q=${encodeURIComponent(q)}&mode=${mode}`;

    const resp = await fetch(url);
    if (!resp.ok || !resp.body) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Failed to connect.' }]);
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let acc = '';
    setMessages((m) => [...m, { role: 'assistant', content: '' }]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      acc += decoder.decode(value, { stream: true });
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { ...copy[copy.length - 1], content: acc };
        return copy;
      });
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/80">
          {mode === 'local' ? <Database size={16} className="text-emerald-300" /> : <Globe size={16} className="text-amber-300" />}
          <span className="text-sm">Mode: {mode === 'local' ? 'Local Knowledge' : 'Web Enrichment'}</span>
        </div>
        <div className="text-xs text-white/60">Hotkey: Alt + J</div>
      </div>

      <div ref={listRef} className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`rounded-xl px-3 py-2 border text-sm ${m.role === 'user' ? 'bg-emerald-400/10 border-emerald-300/20 text-emerald-100 self-end' : 'bg-white/5 border-white/10 text-white/90'}`}>
            {m.content}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask anything about your PDFs..."
          className="flex-1 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
        <button onClick={send} className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 px-3 py-2 text-white">
          <Zap size={16} />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
