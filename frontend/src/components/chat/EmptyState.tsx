'use client';

import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';

const sampleQuestions = [
    'What are the latest treatments for heart failure?',
    'Explain the mechanism of atrial fibrillation',
    'What are the risk factors for coronary artery disease?',
    'How does hypertension affect cardiovascular health?',
];

interface EmptyStateProps {
    onQuestionClick: (question: string) => void;
}

export function EmptyState({ onQuestionClick }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="text-center max-w-2xl">
                <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl shadow-blue-500/30">
                    <MessageCircle className="w-12 h-12 text-white" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    Welcome to Cardiology Research Assistant
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                    Ask questions about recent cardiology research papers and get AI-powered answers
                    with proper citations.
                </p>

                <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Try asking:
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sampleQuestions.map((question, idx) => (
                            <button
                                key={idx}
                                onClick={() => onQuestionClick(question)}
                                className="p-4 text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
                            >
                                <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    {question}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>AI-Powered</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>Research-Based</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span>Cited Sources</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
