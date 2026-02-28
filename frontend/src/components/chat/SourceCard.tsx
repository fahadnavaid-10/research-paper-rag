'use client';

import React from 'react';
import { Source } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, Calendar, Users, BookOpen } from 'lucide-react';

interface SourceCardProps {
    source: Source;
}

export function SourceCard({ source }: SourceCardProps) {
    // Check if source has any meaningful data
    const hasData = source && Object.keys(source).length > 0;

    if (!hasData) {
        return (
            <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="py-3">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Source metadata not available
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="py-3">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                        {/* Title */}
                        {source.title && (
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {source.title}
                            </h4>
                        )}

                        {/* Authors and Year */}
                        <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                            {source.authors && (
                                <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    <span>{source.authors}</span>
                                </div>
                            )}

                            {source.year && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{source.year}</span>
                                </div>
                            )}
                        </div>

                        {/* Journal */}
                        {source.journal && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                                {source.journal}
                            </p>
                        )}

                        {/* DOI */}
                        {source.doi && (
                            <div className="mt-2">
                                <Badge variant="default" className="text-xs">
                                    DOI: {source.doi}
                                </Badge>
                            </div>
                        )}

                        {/* Display all other metadata fields that aren't already shown */}
                        {Object.entries(source).map(([key, value]) => {
                            // Skip already displayed fields and empty values
                            if (['title', 'authors', 'year', 'journal', 'doi'].includes(key) || !value) {
                                return null;
                            }

                            return (
                                <div key={key} className="mt-2 text-xs">
                                    <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize">
                                        {key.replace(/_/g, ' ')}:
                                    </span>{' '}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {String(value)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

