'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';

interface ContextViewerProps {
    context: string;
}

export function ContextViewer({ context }: ContextViewerProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card className="bg-gray-50 dark:bg-gray-900 border-dashed">
            <CardContent className="py-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                        <Eye className="w-4 h-4" />
                        <span>Context Used</span>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs"
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="w-4 h-4 mr-1" />
                                Hide
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4 mr-1" />
                                Show
                            </>
                        )}
                    </Button>
                </div>

                {isExpanded && (
                    <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto">
                        <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                            {context}
                        </pre>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
