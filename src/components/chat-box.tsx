'use client';

import { useState } from 'react';
import { Send, User, Bot, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface Message {
  id: string;
  sender: 'user' | 'other';
  text: string;
  time: string;
}

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'other', text: "Hello! How are you feeling today?", time: "2:45 PM" },
    { id: '2', sender: 'user', text: "I've been feeling a bit stressed recently with final exams.", time: "2:46 PM" },
    { id: '3', sender: 'other', text: "I understand. Stress is very common during finals. Let's talk about some techniques to manage that.", time: "2:47 PM" },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            SJ
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 leading-none">Session Chat</h4>
            <p className="text-[10px] text-green-600 font-medium mt-1 uppercase tracking-wider">Active with Dr. Sarah</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              message.sender === 'user' 
              ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-100' 
              : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
            }`}>
              {message.text}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1 font-medium">{message.time}</span>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <div className="relative flex-1">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..." 
              className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 rounded-2xl pr-10"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-slate-600">
              <Paperclip className="w-4 h-4" />
            </Button>
          </div>
          <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 rounded-2xl shrink-0 h-10 w-10">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
