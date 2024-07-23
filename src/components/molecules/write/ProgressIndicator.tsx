import React from 'react';

export default function ProgressIndicator({ step }: { step: number }) {
    return (
        <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className={`h-2 w-2 rounded-full mx-1 ${index <= step ? 'bg-gray-500' : 'bg-gray-200'}`}
                ></div>
            ))}
        </div>
    );
}
