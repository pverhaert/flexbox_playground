import React from 'react';

export const ResizeHandleIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M21 15L15 21M21 8L8 21M21 21L21 21"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="21" cy="21" r="1.25" fill="currentColor" stroke="none" />
    </svg>
);

export const ResizeHandle: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <div className={`absolute bottom-1 right-1 cursor-se-resize p-1 z-20 ${className}`}>
            <svg
                viewBox="0 0 20 20"
                className="w-4 h-4 text-neutral-400/80 group-hover:text-neutral-600 transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            >
                {/* Longest line (top-left to bottom-right in the corner) */}
                <path d="M17 3L3 17" opacity="0" /> {/* Hidden reference if needed, but we want the specific 3-line look */}

                {/* Based on the image: 3 parallel diagonal lines of decreasing length */}

                {/* 1. Top-most / Longest */}
                <path d="M18 6 L6 18" />

                {/* 2. Middle */}
                <path d="M18 11 L11 18" />

                {/* 3. Smallest (Dot/Short line) */}
                <path d="M18 16 L16 18" />
            </svg>
        </div>
    );
};
