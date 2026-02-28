'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message as MessageType } from '@/types';
import { formatTimestamp } from '@/lib/utils';
import { User, Bot } from 'lucide-react';
import { SourceCard } from './SourceCard';
import { ContextViewer } from './ContextViewer';

interface ChatMessageProps {
    message: MessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fade-in`}>
            {!isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                </div>
            )}

            <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                    className={`px-4 py-3 rounded-2xl ${isUser
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md border border-gray-200 dark:border-gray-700'
                        }`}
                >
                    <div className={`text-sm leading-relaxed prose prose-sm max-w-none ${isUser
                            ? 'prose-invert prose-headings:text-white prose-p:text-white prose-strong:text-white prose-li:text-white prose-a:text-blue-200'
                            : 'dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100'
                        } prose-p:my-1 prose-headings:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5`}>
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                </div>

                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                    {formatTimestamp(message.timestamp)}
                </span>

                {/* Show sources if available */}
                {!isUser && message.sources && message.sources.length > 0 && (
                    <div className="mt-3 w-full space-y-2">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 px-2">
                            📚 Sources:
                        </p>
                        {message.sources.map((source, idx) => (
                            <SourceCard key={idx} source={source} />
                        ))}
                    </div>
                )}

                {/* Show context viewer if available */}
                {!isUser && message.context && (
                    <div className="mt-3 w-full">
                        <ContextViewer context={message.context} />
                    </div>
                )}
            </div>

            {isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                </div>
            )}
        </div>
    );
}
