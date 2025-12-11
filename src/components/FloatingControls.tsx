import React from 'react';
import { RotateCcw, Code, HelpCircle } from 'lucide-react';
import { CodeModal } from './CodeModal';
import { HelpModal } from './HelpModal';
import { ResetModal } from './ResetModal';
import { ThemeSwitch } from './ThemeSwitch';

export const FloatingControls: React.FC = () => {

    const buttonClass = "p-3 bg-white dark:bg-neutral-800 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-neutral-700 transition-all hover:scale-110 active:scale-95 flex items-center justify-center group relative";
    const tooltipClass = "absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none";

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">

            {/* Theme Toggle */}
            <ThemeSwitch />

            {/* Info / Help */}
            <HelpModal>
                <button className={buttonClass}>
                    <HelpCircle size={24} />
                    <span className={tooltipClass}>Help & Info</span>
                </button>
            </HelpModal>

            {/* ... rest of the buttons ... */}

            {/* Get Code */}
            <CodeModal>
                <button className={buttonClass}>
                    <Code size={24} />
                    <span className={tooltipClass}>Get Code</span>
                </button>
            </CodeModal>

            {/* Reset */}
            <ResetModal>
                <button
                    className={`${buttonClass} hover:text-red-500 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20`}
                >
                    <RotateCcw size={24} />
                    <span className={tooltipClass}>Reset Playground</span>
                </button>
            </ResetModal>

        </div>
    );
};
