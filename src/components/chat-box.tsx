'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Paperclip, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

interface Message {
  id: string;
  session_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  profiles?: { full_name: string | null; avatar_url: string | null };
}

interface ChatBoxProps {
  sessionId?: string;
  /** Name shown in the header when sessionId is not provided */
  peerName?: string;
}

export function ChatBox({ sessionId, peerName }: ChatBoxProps) {
  const supabase = createClient();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(!!sessionId);
  const [sending, setSending] = useState(false);
  const [myId, setMyId] = useState<string | null>(null);
  const [myName, setMyName] = useState('');

  // Seed fallback messages when no sessionId (demo mode)
  const DEMO_MESSAGES: Message[] = [
    { id: '1', session_id: '', sender_id: 'other', content: 'Hello! How are you feeling today?', created_at: new Date(Date.now() - 120000).toISOString() },
    { id: '2', session_id: '', sender_id: 'me',    content: "I've been a bit stressed with exams.", created_at: new Date(Date.now() - 60000).toISOString() },
    { id: '3', session_id: '', sender_id: 'other', content: "I understand. Let's talk through some techniques to manage that.", created_at: new Date().toISOString() },
  ];

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = useCallback(async () => {
    if (!sessionId) { setMessages(DEMO_MESSAGES); setLoading(false); return; }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setMyId(user.id);

    const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
    setMyName(profile?.full_name || 'You');

    const { data } = await supabase
      .from('messages')
      .select('*, profiles:sender_id(full_name, avatar_url)')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (data) setMessages(data);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, supabase]);

  useEffect(() => {
    fetchMessages();

    if (!sessionId) return;

    // Supabase Realtime subscription
    const channel = supabase
      .channel(`session-chat-${sessionId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `session_id=eq.${sessionId}` },
        async (payload) => {
          // Fetch the sender profile for the new message
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', payload.new.sender_id)
            .single();

          const newMsg: Message = { ...(payload.new as Message), profiles: profile ?? undefined };
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.find((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchMessages, sessionId, supabase]);

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Demo mode — just add locally
    if (!sessionId || !myId) {
      setMessages((prev) => [...prev, {
        id: Date.now().toString(), session_id: '', sender_id: 'me',
        content: inputText, created_at: new Date().toISOString()
      }]);
      setInputText('');
      return;
    }

    setSending(true);
    const { error } = await supabase.from('messages').insert({
      session_id: sessionId,
      sender_id: myId,
      content: inputText.trim(),
    });

    if (error) console.error('Send error:', error.message);
    setInputText('');
    setSending(false);
  };

  const isMe = (msg: Message) => (sessionId ? msg.sender_id === myId : msg.sender_id === 'me');

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-udanix-blue flex items-center justify-center text-white text-xs font-black">
          {(peerName || 'SJ').charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">Session Chat</h4>
          <p className="text-[10px] text-green-600 font-bold mt-1 uppercase tracking-wider">
            {sessionId ? 'Realtime · Encrypted' : `Active with ${peerName || 'Counselor'}`}
          </p>
        </div>
        {sessionId && (
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Live</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/30">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 text-udanix-blue animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">No messages yet. Start the conversation.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const mine = isMe(msg);
            return (
              <div key={msg.id} className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
                {!mine && msg.profiles?.full_name && (
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">{msg.profiles.full_name}</span>
                )}
                {mine && myName && (
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 mr-1">{myName}</span>
                )}
                <div className="flex items-end gap-2">
                  {!mine && msg.profiles?.avatar_url && (
                    <Image src={msg.profiles.avatar_url} alt="" width={24} height={24} className="w-6 h-6 rounded-lg object-cover shrink-0" />
                  )}
                  <div className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium ${
                    mine
                      ? 'bg-udanix-blue text-white rounded-tr-sm shadow-lg shadow-blue-500/10'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
                <span className="text-[9px] text-slate-300 mt-1 px-1 font-bold uppercase tracking-widest">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <form onSubmit={handleSend} className="flex gap-2">
          <div className="relative flex-1">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="bg-slate-50 border-slate-100 focus-visible:ring-udanix-blue/20 rounded-xl pr-10 text-sm"
              disabled={sending}
            />
            <Button variant="ghost" size="icon" type="button" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-300 hover:text-slate-500">
              <Paperclip className="w-4 h-4" />
            </Button>
          </div>
          <Button
            type="submit"
            size="icon"
            className="bg-udanix-blue hover:bg-blue-700 rounded-xl shrink-0 h-10 w-10 shadow-lg shadow-blue-500/20"
            disabled={sending || !inputText.trim()}
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
