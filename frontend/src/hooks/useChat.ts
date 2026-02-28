import { useState, useCallback } from 'react';
import { Message } from '@/types';
import { api } from '@/services/api';

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = useCallback(async (question: string) => {
        if (!question.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: question,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.askQuestion(question);

            // Log the response for debugging
            console.log('API Response:', response);
            console.log('Sources:', response.sources);
            console.log('Sources type:', typeof response.sources);
            console.log('Is array:', Array.isArray(response.sources));

            // Normalize sources to always be an array
            let normalizedSources: typeof response.sources = [];

            if (response.sources) {
                if (Array.isArray(response.sources)) {
                    normalizedSources = response.sources;
                } else {
                    // If sources is a single object, wrap it in an array
                    normalizedSources = [response.sources];
                }
            }

            console.log('Normalized sources:', normalizedSources);

            // Add assistant message
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.answer,
                sources: normalizedSources,
                context: response.context_used,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);

            // Add error message
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Sorry, I encountered an error: ${errorMessage}`,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearChat = useCallback(() => {
        setMessages([]);
        setError(null);
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearChat,
    };
}
