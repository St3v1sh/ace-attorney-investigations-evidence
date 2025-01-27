import React from "react";


interface TabProps {
    title: string;
    titleOffset: number;
    children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ title, titleOffset, children }) => {
    return (
        <div className="tab">
            <h2 style={{ transform: `translateY(${titleOffset}rem)` }}>{title}</h2>
            {children}
        </div>
    );
}

export default Tab;
