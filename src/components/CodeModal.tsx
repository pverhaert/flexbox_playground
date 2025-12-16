import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Code, Copy, Check } from 'lucide-react';
import { useFlexbox } from '../context/FlexContext';

interface CodeModalProps {
    children?: React.ReactNode;
}

export const CodeModal: React.FC<CodeModalProps> = ({ children }) => {
    const { containerStyle, items, flexEnabled } = useFlexbox();
    const [open, setOpen] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const generateCode = () => {
        // Defaults to check against
        const defaults = {
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            alignContent: 'stretch',
            rowGap: 0,
            columnGap: 0,
        };

        const itemDefaults = {
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: 'auto',
        };

        let containerProps = [];

        if (flexEnabled) {
            containerProps.push('  display: flex;');
            if (containerStyle.flexDirection !== defaults.flexDirection) containerProps.push(`  flex-direction: ${containerStyle.flexDirection};`);
            if (containerStyle.flexWrap !== defaults.flexWrap) containerProps.push(`  flex-wrap: ${containerStyle.flexWrap};`);
            if (containerStyle.justifyContent !== defaults.justifyContent) containerProps.push(`  justify-content: ${containerStyle.justifyContent};`);
            if (containerStyle.alignItems !== defaults.alignItems) containerProps.push(`  align-items: ${containerStyle.alignItems};`);
            if (containerStyle.alignContent !== defaults.alignContent) containerProps.push(`  align-content: ${containerStyle.alignContent};`);

            // Gap properties
            const hasRowGap = containerStyle.rowGap !== defaults.rowGap;
            const hasColumnGap = containerStyle.columnGap !== defaults.columnGap;
            if (hasRowGap) containerProps.push(`  row-gap: ${containerStyle.rowGap}rem;`);
            if (hasColumnGap) containerProps.push(`  column-gap: ${containerStyle.columnGap}rem;`);
            if (hasRowGap || hasColumnGap) {
                const gapShorthand = containerStyle.rowGap === containerStyle.columnGap
                    ? `${containerStyle.rowGap}rem`
                    : `${containerStyle.rowGap}rem ${containerStyle.columnGap}rem`;
                containerProps.push(`  /* Shorthand: gap: ${gapShorthand}; */`);
            }
        } else {
            containerProps.push('  display: block;');
        }

        const containerCSS = `.container {
${containerProps.join('\n')}
}`;

        const itemsCSS = items.map((item: import('../types').FlexItem) => {
            // Only show properties that are not default
            let props = [];
            if (item.style.width) props.push(`  width: ${item.style.width};`);
            if (item.style.height) props.push(`  height: ${item.style.height};`);

            // Only include flex-specific properties when flex is enabled
            if (flexEnabled) {
                if (item.style.alignSelf !== 'auto') props.push(`  align-self: ${item.style.alignSelf};`);
                if (item.style.flexGrow !== itemDefaults.flexGrow) props.push(`  flex-grow: ${item.style.flexGrow};`);
                if (item.style.flexShrink !== itemDefaults.flexShrink) props.push(`  flex-shrink: ${item.style.flexShrink};`);
                if (item.style.order !== 0) props.push(`  order: ${item.style.order};`);
                if (item.style.flexBasis !== itemDefaults.flexBasis) props.push(`  flex-basis: ${item.style.flexBasis};`);

                // Add flex shorthand comment if any flex property is non-default
                const hasFlexGrow = item.style.flexGrow !== itemDefaults.flexGrow;
                const hasFlexShrink = item.style.flexShrink !== itemDefaults.flexShrink;
                const hasFlexBasis = item.style.flexBasis !== itemDefaults.flexBasis;
                if (hasFlexGrow || hasFlexShrink || hasFlexBasis) {
                    props.push(`  /* Shorthand: flex: ${item.style.flexGrow} ${item.style.flexShrink} ${item.style.flexBasis}; */`);
                }
            }

            if (props.length === 0) return '';

            return `.item-${item.id} {
${props.join('\n')}
}`;
        }).filter(Boolean).join('\n\n');

        const html = `<div class="container">
${items.map((item: import('../types').FlexItem) => `  <div class="item-${item.id}">${item.text}</div>`).join('\n')}
</div>`;

        return `/* CSS */
${containerCSS}

${itemsCSS}

/* HTML */
${html}`;
    };

    const code = generateCode();

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                {children || (
                    <button className="w-full mt-6 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 py-2 px-4 rounded-md border border-neutral-200 flex items-center justify-center gap-2 transition-colors font-medium shadow-sm">
                        <Code size={16} />
                        <span>Get Code</span>
                    </button>
                )}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-neutral-200 rounded-xl shadow-2xl p-6 w-[600px] max-w-[90vw] z-50 animate-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-xl font-bold text-neutral-900">Generated Code</Dialog.Title>
                        <Dialog.Close className="text-neutral-400 hover:text-neutral-600">
                            <X size={20} />
                        </Dialog.Close>
                    </div>

                    <div className="relative group">
                        <pre className="bg-neutral-50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-neutral-700 max-h-[400px] border border-neutral-200">
                            {code}
                        </pre>
                        <button
                            onClick={handleCopy}
                            className="absolute top-2 right-2 p-2 bg-white hover:bg-neutral-50 rounded-md text-neutral-500 hover:text-neutral-900 transition-colors border border-neutral-200 shadow-sm"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Dialog.Close asChild>
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium shadow-sm">
                                Done
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
