import React from 'react';

export interface TabPanelProps {
    children?: React.ReactNode;
    className?: string;
    name: string;
    value: number;
    index: number;
}

export const TabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, className, name, value, index } = props;

    const id = name ? `${name}-tabpanel-${index}` : `tabpanel-${index}`;
    const label = name ? `${name}-tab-${index}` : `tab-${index}`;

    return (
        <div
            className={className}
            role="tabpanel"
            hidden={value !== index}
            id={id}
            aria-labelledby={label}
        >
            {value === index && children}
        </div>
    );
};

export default TabPanel;
