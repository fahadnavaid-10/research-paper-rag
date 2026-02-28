import React from 'react';
import { Heart } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg shadow-lg">
                            <Heart className="w-6 h-6 text-white" fill="white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                Cardiology Research Assistant
                            </h1>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                AI-Powered Medical Research Q&A
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
