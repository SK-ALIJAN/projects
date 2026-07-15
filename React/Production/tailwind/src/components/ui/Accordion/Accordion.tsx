import React, { useState } from 'react';

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
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
        <div className="border border-gray-200 rounded-lg overflow-hidden w-full">
            {items.map((item) => {
                const isOpen = openIds.includes(item.id);
                return (
                    <div key={item.id} className="border-b border-gray-200 last:border-none">
                        <button
                            className="w-full px-5 py-3.5 flex items-center justify-between bg-white hover:bg-gray-50 border-none text-sm font-medium text-gray-900 cursor-pointer transition-colors outline-none"
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={isOpen}
                        >
                            <span className="text-left">{item.title}</span>
                            <span className={`text-xs text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                                ▾
                            </span>
                        </button>
                        {isOpen && (
                            <div className="px-5 py-4 bg-white border-t border-gray-200 text-sm text-gray-600 leading-relaxed">
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
