import React, { useState } from 'react';

interface TabItem {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface TabsProps {
    items: TabItem[];
    defaultActiveId?: string;
}

const Tabs: React.FC<TabsProps> = ({ items, defaultActiveId }) => {
    const [activeId, setActiveId] = useState<string>(defaultActiveId || items[0]?.id || '');

    const activeItem = items.find((item) => item.id === activeId);

    return (
        <div className="flex flex-col w-full">
            <div className="flex border-b border-gray-200 mb-4 gap-2" role="tablist">
                {items.map((item) => (
                    <button
                        key={item.id}
                        role="tab"
                        aria-selected={item.id === activeId}
                        className={`bg-transparent border-0 px-4 py-2 text-sm font-medium cursor-pointer border-b-2 transition-all focus:outline-none -mb-[1px] ${item.id === activeId ? 'text-blue-600 border-blue-600 font-semibold' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                        onClick={() => setActiveId(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className="text-sm text-gray-600" role="tabpanel">
                {activeItem?.content}
            </div>
        </div>
    );
};

export default Tabs;
