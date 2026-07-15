import React, { useState } from 'react';
import styles from './accordion.module.css';

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
        <div className={styles.accordion}>
            {items.map((item) => {
                const isOpen = openIds.includes(item.id);
                return (
                    <div key={item.id} className={styles.item}>
                        <button
                            className={styles.header}
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={isOpen}
                        >
                            <span className={styles.title}>{item.title}</span>
                            <span className={`${styles.icon} ${isOpen ? styles.open : ''}`}>
                                ▾
                            </span>
                        </button>
                        {isOpen && <div className={styles.content}>{item.content}</div>}
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
