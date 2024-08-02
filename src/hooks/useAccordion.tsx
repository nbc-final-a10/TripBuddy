import React, { useState } from 'react';

type AccordionProps = {
    title: string;
    isOpen: boolean;
    toggleAccordion: () => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
};

function useAccordion(initialOpen: boolean = false) {
    const [isOpen, setIsOpen] = useState(initialOpen);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const closeAccordion = () => {
        setIsOpen(false);
    };

    return {
        isOpen,
        toggleAccordion,
        closeAccordion,
    };
}

const Accordion: React.FC<AccordionProps> = ({
    title,
    isOpen,
    toggleAccordion,
    children,
    icon,
}) => {
    return (
        <div className="w-full rounded-lg mb-2">
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={toggleAccordion}
            >
                <div className="flex items-center">
                    {icon && <div className="text-xl mr-4">{icon}</div>}
                </div>
                <div className="flex-grow text-center">
                    <div className="text-xl font-medium">{title}</div>
                </div>
                <div className="text-xl">
                    {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
                </div>
            </div>
            {isOpen && <div className="border-t p-4">{children}</div>}
        </div>
    );
};

export { useAccordion, Accordion };
