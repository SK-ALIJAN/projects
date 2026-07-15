import React, { useState } from 'react';
import styles from './tabs.module.css';

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
        <div className={styles.tabsContainer}>
            <div className={styles.tabList} role="tablist">
                {items.map((item) => (
                    <button
                        key={item.id}
                        role="tab"
                        aria-selected={item.id === activeId}
                        className={`${styles.tabBtn} ${item.id === activeId ? styles.active : ''}`}
                        onClick={() => setActiveId(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className={styles.tabContent} role="tabpanel">
                {activeItem?.content}
            </div>
        </div>
    );
};

export default Tabs;
