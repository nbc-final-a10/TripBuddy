import React from 'react';

export default function ProgressIndicator({ step }: { step: number }) {
    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className={`h-2 xl:h-4 w-2 xl:w-4 rounded-full mx-1 ${index <= step ? 'bg-gray-500' : 'bg-gray-200'}`}
                ></div>
            ))}
        </div>
    );
}
