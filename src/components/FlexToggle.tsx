import React from 'react';
import { useFlexbox } from '../context/FlexContext';

export const FlexToggle: React.FC = () => {
    const { flexEnabled, setFlexEnabled } = useFlexbox();

    return (
        <div className="fixed top-4 right-4 z-[60] flex items-center gap-3 bg-white dark:bg-neutral-800 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-700 px-4 py-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Flex
            </span>
            <span className={`text-xs font-mono min-w-[24px] ${
                flexEnabled 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-neutral-400 dark:text-neutral-500'
            }`}>
                {flexEnabled ? 'ON' : 'OFF'}
            </span>
            <button
                onClick={() => setFlexEnabled(!flexEnabled)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                    flexEnabled 
                        ? 'bg-green-500 dark:bg-green-600' 
                        : 'bg-neutral-300 dark:bg-neutral-600'
                }`}
                aria-label={flexEnabled ? 'Disable flex' : 'Enable flex'}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                        flexEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    );
};

