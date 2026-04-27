'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Check, X } from 'lucide-react';
import { Input } from './input';

interface SearchableSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    className?: string;
}

export function SearchableSelect({
    options,
    value,
    onChange,
    placeholder = 'Select option...',
    label,
    className = '',
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative space-y-2 ${className}`} ref={containerRef}>
            {label && (
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    {label}
                </label>
            )}

            {/* Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`h-14 px-5 rounded-2xl border-slate-200 bg-slate-50 border flex items-center justify-between cursor-pointer transition-all hover:bg-white hover:border-udanix-blue/30 ${isOpen ? 'ring-4 ring-udanix-blue/5 border-udanix-blue bg-white' : ''
                    }`}
            >
                <span className={`text-base font-medium ${!value ? 'text-slate-400' : 'text-slate-900'}`}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-udanix-blue' : ''}`} />
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute z-[100] top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden"
                    >
                        {/* Search Input */}
                        <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-udanix-blue/20 focus:border-udanix-blue"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>

                        {/* Options List */}
                        <div className="max-h-60 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((opt) => (
                                    <div
                                        key={opt}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onChange(opt);
                                            setIsOpen(false);
                                            setSearch('');
                                        }}
                                        className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${value === opt
                                                ? 'bg-udanix-blue/5 text-udanix-blue'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        <span className="text-sm font-semibold">{opt}</span>
                                        {value === opt && <Check className="w-4 h-4" />}
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    No results found
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
