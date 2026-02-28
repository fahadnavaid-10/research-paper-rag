import { AnswerResponse, QueryRequest } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export const api = {
    async askQuestion(question: string): Promise<AnswerResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question } as QueryRequest),
            });

            if (!response.ok) {
                throw new ApiError(
                    response.status,
                    `API request failed: ${response.statusText}`
                );
            }

            const data: AnswerResponse = await response.json();
            return data;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            // Network or other errors
            console.error('API Error:', error);
            throw new Error('Failed to connect to the server. Please ensure the backend is running.');
        }
    },

    async healthCheck(): Promise<boolean> {
        try {
            const response = await fetch(`${API_BASE_URL}/`);
            return response.ok;
        } catch {
            return false;
        }
    },
};
