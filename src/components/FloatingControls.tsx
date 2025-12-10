import React from 'react';
import { RotateCcw, Code, HelpCircle } from 'lucide-react';
import { CodeModal } from './CodeModal';
import { HelpModal } from './HelpModal';
import { ResetModal } from './ResetModal';

export const FloatingControls: React.FC = () => {

    const buttonClass = "p-3 bg-white rounded-full shadow-lg border border-neutral-200 text-neutral-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all hover:scale-110 active:scale-95 flex items-center justify-center group relative";
    const tooltipClass = "absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-neutral-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none";

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">

            {/* Info / Help */}
            <HelpModal>
                <button className={buttonClass}>
                    <HelpCircle size={24} />
                    <span className={tooltipClass}>Help & Info</span>
                </button>
            </HelpModal>

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
                    className={`${buttonClass} hover:text-red-500 hover:border-red-200 hover:bg-red-50`}
                >
                    <RotateCcw size={24} />
                    <span className={tooltipClass}>Reset Playground</span>
                </button>
            </ResetModal>

        </div>
    );
};
