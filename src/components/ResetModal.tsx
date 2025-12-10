import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { useFlexbox } from '../context/FlexContext';

interface ResetModalProps {
    children?: React.ReactNode;
}

export const ResetModal: React.FC<ResetModalProps> = ({ children }) => {
    const { resetPlayground } = useFlexbox();
    const [open, setOpen] = React.useState(false);

    const handleReset = () => {
        resetPlayground();
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-neutral-200 rounded-xl shadow-2xl p-6 w-[400px] max-w-[90vw] z-50 animate-in zoom-in-95 duration-200 outline-none">

                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-2">
                            <AlertTriangle size={24} />
                        </div>

                        <Dialog.Title className="text-xl font-bold text-neutral-900">
                            Reset Playground?
                        </Dialog.Title>

                        <Dialog.Description className="text-neutral-600 text-sm">
                            This will revert all container properties and items to their original default state. This action cannot be undone.
                        </Dialog.Description>

                        <div className="flex gap-3 w-full mt-4">
                            <Dialog.Close asChild>
                                <button className="flex-1 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 font-medium transition-colors">
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                onClick={handleReset}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={16} />
                                Reset
                            </button>
                        </div>
                    </div>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
