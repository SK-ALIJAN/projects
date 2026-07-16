import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false, className = '' }) => {
    const [openIds, setOpenIds] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
            );
        } else {
            setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
        }
    };

    return (
        <div className={cn('border border-gray-200 rounded-lg overflow-hidden w-full', className)}>
            {items.map((item) => {
                const isOpen = openIds.includes(item.id);
                const triggerId = `accordion-trigger-${item.id}`;
                const panelId = `accordion-panel-${item.id}`;

                return (
                    <div key={item.id} className="border-b border-gray-200 last:border-none">
                        <button
                            id={triggerId}
                            aria-controls={panelId}
                            aria-expanded={isOpen}
                            className="w-full px-5 py-3.5 flex items-center justify-between bg-white hover:bg-gray-50 border-none text-sm font-medium text-gray-900 cursor-pointer transition-colors outline-none"
                            onClick={() => toggleItem(item.id)}
                        >
                            <span className="text-start">{item.title}</span>
                            <span className={cn('text-xs text-gray-400 transition-transform duration-200', isOpen && 'rotate-180')}>
                                ▾
                            </span>
                        </button>
                        {isOpen && (
                            <div
                                id={panelId}
                                aria-labelledby={triggerId}
                                role="region"
                                className="px-5 py-4 bg-white border-t border-gray-200 text-sm text-gray-600 leading-relaxed text-start"
                            >
                                {item.content}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
