import React from 'react';
import { Rocket, Brain, BookOpen } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative w-full h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a1224] via-[#0e1733] to-[#11203a]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/T5Q5C7Wsdj2O2mzi/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a1224] via-transparent to-transparent opacity-90" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur border border-white/10">
          <Rocket size={14} className="text-emerald-300" />
          <span>EduLLM 2.0 — AI Exam & Research Assistant</span>
        </div>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Master PDFs, Generate Quizzes, Chat with Knowledge
        </h1>
        <p className="mt-3 max-w-2xl text-white/70">
          Upload academic PDFs, extract topics and question clusters, then explore with an AI assistant.
          Toggle Web Enrichment to blend trusted sources with your local library.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-emerald-400/10 text-emerald-200 px-3 py-2 border border-emerald-300/20">
            <Brain size={16} />
            <span className="text-sm">LangGraph Reasoning</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-amber-400/10 text-amber-200 px-3 py-2 border border-amber-300/20">
            <BookOpen size={16} />
            <span className="text-sm">Quiz Generator & Analytics</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
