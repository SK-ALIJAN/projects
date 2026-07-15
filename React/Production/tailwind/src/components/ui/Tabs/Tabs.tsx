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
                        className={`bg-transparent border-none px-4 py-2 text-sm font-medium border-b-2 cursor-pointer transition-all outline-none ${item.id === activeId ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
                        onClick={() => setActiveId(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className="text-sm text-gray-700" role="tabpanel">
                {activeItem?.content}
            </div>
        </div>
    );
};

export default Tabs;
