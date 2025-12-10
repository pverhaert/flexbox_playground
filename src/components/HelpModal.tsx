import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, HelpCircle, Layout, Box } from 'lucide-react';
import { flexDefinitions } from '../data/flexboxData';

interface HelpModalProps {
    children?: React.ReactNode;
}

export const HelpModal: React.FC<HelpModalProps> = ({ children }) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {children || (
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-neutral-50 border border-neutral-200 text-neutral-600 transition-all hover:scale-110 active:scale-95">
                        <HelpCircle size={24} />
                    </button>
                )}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-neutral-200 rounded-xl shadow-2xl p-0 w-[800px] max-w-[90vw] h-[80vh] flex flex-col z-50 animate-in zoom-in-95 duration-200 outline-none">

                    <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-neutral-50 rounded-t-xl">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <HelpCircle size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-neutral-900">Flexbox Cheatsheet</h2>
                                <p className="text-sm text-neutral-500">Quick reference for container and item properties</p>
                            </div>
                        </div>
                        <Dialog.Close className="text-neutral-400 hover:text-neutral-600 p-2 hover:bg-neutral-200 rounded-full transition-colors">
                            <X size={20} />
                        </Dialog.Close>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">

                        {/* Container Properties */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 text-blue-700">
                                <Layout size={20} />
                                <h3 className="text-lg font-bold">Container Properties</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(flexDefinitions).filter(([key]) => !['alignSelf'].includes(key)).map(([key, def]) => (
                                    <div key={key} className="p-4 border border-neutral-200 rounded-lg bg-white shadow-sm hover:border-blue-200 transition-colors">
                                        <h4 className="font-mono font-bold text-blue-600 text-sm mb-2">{def.title}</h4>
                                        <p className="text-sm text-neutral-600 mb-3 leading-relaxed">{def.description}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {def.options.map(opt => (
                                                <span key={opt} className="px-2 py-1 bg-neutral-100 text-neutral-500 text-xs rounded-md font-mono border border-neutral-200">
                                                    {opt}
                                                </span>
                                            ))}
                                        </div>
                                        {key === 'alignContent' && (
                                            <p className="text-[10px] text-red-500 mt-2 font-medium">
                                                Note: This property has no effect when flex-wrap is set to nowrap.
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Item Properties */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 text-orange-600">
                                <Box size={20} />
                                <h3 className="text-lg font-bold">Item Properties</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 border border-neutral-200 rounded-lg bg-white shadow-sm hover:border-orange-200 transition-colors">
                                    <h4 className="font-mono font-bold text-orange-600 text-sm mb-2">flex-grow</h4>
                                    <p className="text-sm text-neutral-600 mb-2 leading-relaxed">Defines the ability for a flex item to grow if necessary.</p>
                                    <span className="text-xs text-neutral-400">Accepts: number</span>
                                </div>
                                <div className="p-4 border border-neutral-200 rounded-lg bg-white shadow-sm hover:border-orange-200 transition-colors">
                                    <h4 className="font-mono font-bold text-orange-600 text-sm mb-2">flex-shrink</h4>
                                    <p className="text-sm text-neutral-600 mb-2 leading-relaxed">Defines the ability for a flex item to shrink if necessary.</p>
                                    <span className="text-xs text-neutral-400">Accepts: number</span>
                                </div>
                                <div className="p-4 border border-neutral-200 rounded-lg bg-white shadow-sm hover:border-orange-200 transition-colors">
                                    <h4 className="font-mono font-bold text-orange-600 text-sm mb-2">flex-basis</h4>
                                    <p className="text-sm text-neutral-600 mb-2 leading-relaxed">Defines the default size of an element before the remaining space is distributed.</p>
                                    <span className="text-xs text-neutral-400">Accepts: length (e.g. 20%, 5rem, auto)</span>
                                </div>
                                <div className="p-4 border border-neutral-200 rounded-lg bg-white shadow-sm hover:border-orange-200 transition-colors">
                                    <h4 className="font-mono font-bold text-orange-600 text-sm mb-2">order</h4>
                                    <p className="text-sm text-neutral-600 mb-2 leading-relaxed">Controls the order in which the item appears in the flex container.</p>
                                    <span className="text-xs text-neutral-400">Accepts: number</span>
                                </div>
                                <div className="p-4 border border-neutral-200 rounded-lg bg-white shadow-sm hover:border-orange-200 transition-colors">
                                    <h4 className="font-mono font-bold text-orange-600 text-sm mb-2">align-self</h4>
                                    <p className="text-sm text-neutral-600 mb-2 leading-relaxed">Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.</p>
                                    <div className="flex flex-wrap gap-1">
                                        {flexDefinitions.alignSelf.options.map(opt => (
                                            <span key={opt} className="px-2 py-1 bg-neutral-100 text-neutral-500 text-xs rounded-md font-mono border border-neutral-200">
                                                {opt}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Common Conflicts */}
                        <section className="bg-red-50 rounded-lg p-5 border border-red-100">
                            <div className="flex items-center gap-2 mb-4 text-red-700">
                                <h3 className="text-lg font-bold">Common Conflicts & Exceptions</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-neutral-700">
                                <li className="flex gap-2">
                                    <span className="text-red-500 font-bold">•</span>
                                    <span>
                                        <strong>Parent: flex-wrap: nowrap + align-content</strong><br />
                                        If nowrap (default), align-content has absolutely no effect. It only controls spacing of multiple lines.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-500 font-bold">•</span>
                                    <span>
                                        <strong>Parent: justify-content + Child: flex-grow</strong><br />
                                        If children grow to fill space, justify-content has no "free space" to distribute and will appear to do nothing.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-500 font-bold">•</span>
                                    <span>
                                        <strong>Parent: justify/align + Child: margin: auto</strong><br />
                                        margin: auto greedily absorbs available space, overriding the parent's alignment settings for that item.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-500 font-bold">•</span>
                                    <span>
                                        <strong>Parent: align-items + Child: align-self</strong><br />
                                        align-self completely overrides the parent's align-items value for that specific child.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-500 font-bold">•</span>
                                    <span>
                                        <strong>Direction: column + Child: flex-basis</strong><br />
                                        In column mode, flex-basis controls Height instead of Width.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-500 font-bold">•</span>
                                    <span>
                                        <strong>Child: flex-shrink + min-width: auto</strong><br />
                                        Items won't shrink below their content size by default. Set <code>min-width: 0</code> to force shrinking.
                                    </span>
                                </li>
                            </ul>
                        </section>

                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
