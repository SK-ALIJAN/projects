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
        <div className="border border-gray-200 rounded-lg overflow-hidden w-full bg-white">
            {items.map((item, index) => {
                const isOpen = openIds.includes(item.id);
                return (
                    <div key={item.id} className={index !== items.length - 1 ? 'border-b border-gray-200' : ''}>
                        <button
                            className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-gray-50 border-none font-medium text-sm text-gray-900 cursor-pointer focus:outline-none transition-colors"
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={isOpen}
                        >
                            <span className="text-left">{item.title}</span>
                            <span className={`text-xs text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                                ▾
                            </span>
                        </button>
                        {isOpen && (
                            <div className="px-5 py-4 bg-gray-50/30 border-t border-gray-200 text-sm text-gray-600 leading-relaxed">
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
