import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, RefreshCcw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your Nurture AI Assistant. Ask me anything about your plants, pest identification, or garden planning!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          systemInstruction: "You are an expert gardening assistant named Nurture AI. Provide concise, practical, and friendly advice for home gardeners. Focus on plant care, pest identification, and seasonal tips.",
        }
      });

      const botMessage = { role: 'bot', text: response.text || "I'm sorry, I couldn't process that. Could you try again?" };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting right now. Please check your API key or try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col glass-card rounded-[32px] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-emerald-600 text-white">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-black tracking-tight">Nurture AI</h2>
            <div className="flex items-center text-[10px] font-bold uppercase tracking-widest opacity-80">
              <span className="h-1.5 w-1.5 bg-emerald-300 rounded-full mr-1.5 animate-pulse" />
              Online & Ready
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <RefreshCcw className="h-5 w-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-800 ml-2' : 'bg-emerald-100 dark:bg-emerald-900/30 mr-2'
                }`}>
                  {msg.role === 'user' ? <User className="h-4 w-4 text-slate-600" /> : <Bot className="h-4 w-4 text-emerald-600" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-lg shadow-emerald-500/10' 
                    : 'bg-white dark:bg-slate-900 dark:text-slate-200 border border-slate-100 dark:border-white/5 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl rounded-bl-none border border-slate-100 dark:border-white/5 flex items-center space-x-2">
              <Loader2 className="h-4 w-4 text-emerald-600 animate-spin" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nurture is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/10 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about plant care, pests, or layout..."
            className="w-full pl-6 pr-16 py-4 bg-white dark:bg-slate-800 border-2 border-transparent focus:border-emerald-600 dark:focus:border-emerald-500 rounded-2xl outline-none transition-all font-medium dark:text-white shadow-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-4">
          <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            Identify Pest
          </button>
          <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            Care Schedule
          </button>
          <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            Soil Tips
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
