'use client';

import React from 'react';
import { useChat } from '@/hooks/useChat';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { EmptyState } from './EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { Container } from '@/components/layout/Container';

export function ChatContainer() {
    const { messages, isLoading, sendMessage } = useChat();
    const messagesEndRef = useAutoScroll<HTMLDivElement>(messages);

    const handleSendMessage = (message: string) => {
        sendMessage(message);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)]">
            {/* Messages Area */}
            <div
                ref={messagesEndRef}
                className="flex-1 overflow-y-auto py-6 scroll-smooth"
            >
                <Container>
                    {messages.length === 0 ? (
                        <EmptyState onQuestionClick={handleSendMessage} />
                    ) : (
                        <div className="space-y-6">
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}

                            {/* Loading Skeleton */}
                            {isLoading && (
                                <div className="flex gap-4 mb-6">
                                    <Skeleton className="w-10 h-10 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Container>
            </div>

            {/* Input Area */}
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
        </div>
    );
}
