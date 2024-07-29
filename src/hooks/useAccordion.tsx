import React, { useState } from 'react';

type AccordionProps = {
    title: string;
    isOpen: boolean;
    toggleAccordion: () => void;
    children: React.ReactNode;
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
}) => {
    return (
        <div className="py-6 border-b border-gray-200">
            <details className="group" open={isOpen}>
                <summary
                    className="flex justify-between items-center font-medium cursor-pointer list-none my-2"
                    onClick={e => {
                        e.preventDefault();
                        toggleAccordion();
                    }}
                >
                    <span className="text-center font-semibold xl:text-xl">
                        {title}
                    </span>
                    <span className="transition group-open:rotate-180 ml-auto">
                        <svg
                            fill="none"
                            height="24"
                            shapeRendering="geometricPrecision"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <div className="text-neutral-600 group-open:animate-fadeIn">
                    {children}
                </div>
            </details>
        </div>
    );
};

export { useAccordion, Accordion };
