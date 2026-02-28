'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() && !isLoading) {
            onSend(input.trim());
            setInput('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg">
            <div className="container mx-auto max-w-5xl">
                <div className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask a question about cardiology research..."
                            disabled={isLoading}
                            rows={1}
                            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                minHeight: '48px',
                                maxHeight: '200px',
                                height: 'auto',
                            }}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = target.scrollHeight + 'px';
                            }}
                        />
                        <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                            {input.length}/500
                        </div>
                    </div>

                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        size="lg"
                        className="px-6"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Thinking...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2" />
                                Send
                            </>
                        )}
                    </Button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Press Enter to send, Shift+Enter for new line
                </p>
            </div>
        </div>
    );
}
