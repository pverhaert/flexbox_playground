import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeSwitch: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const cycleTheme = () => {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('system');
        else setTheme('light');
    };

    const getIcon = () => {
        switch (theme) {
            case 'light': return <Sun size={24} />;
            case 'dark': return <Moon size={24} />;
            case 'system': return <Monitor size={24} />;
        }
    };

    const getLabel = () => {
        switch (theme) {
            case 'light': return 'Light Mode';
            case 'dark': return 'Dark Mode';
            case 'system': return 'System Default';
        }
    };

    // Shared button styles from FloatingControls (could be extracted to a shared constant or component)
    const buttonClass = "p-3 bg-white dark:bg-neutral-800 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-neutral-700 transition-all hover:scale-110 active:scale-95 flex items-center justify-center group relative";
    const tooltipClass = "absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none";

    return (
        <button onClick={cycleTheme} className={buttonClass}>
            {getIcon()}
            <span className={tooltipClass}>{getLabel()}</span>
        </button>
    );
};
