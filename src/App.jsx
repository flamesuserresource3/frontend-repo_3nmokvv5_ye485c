import React from 'react';
import Hero from './components/Hero';
import UploadCard from './components/UploadCard';
import ChatBox from './components/ChatBox';
import AnalyticsPreview from './components/AnalyticsPreview';

const App = () => {
  return (
    <div className="min-h-screen w-full bg-[#0a0f1a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UploadCard />
          <ChatBox />
        </div>

        <AnalyticsPreview />

        <footer className="pt-6 text-center text-white/50 text-sm">
          Built for EduLLM 2.0 — AI Exam & Research Assistant
        </footer>
      </div>
    </div>
  );
};

export default App;
