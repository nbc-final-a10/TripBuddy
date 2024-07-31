import React, { useState } from 'react';

const AgeCount: React.FC = () => {
    const [minAge, setMinAge] = useState(20);
    const [maxAge, setMaxAge] = useState(80);

    const handleMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxAge - 1);
        setMinAge(value);
    };

    const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minAge + 1);
        setMaxAge(value);
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center mx-auto">
                <section className="flex justify-center items-center gap-1.5 mb-4 w-full mx-auto xl:gap-5">
                    <div className="relative">
                        <input
                            className="bg-gray-100 rounded-full w-full p-1 px-3 text-right pr-8"
                            value={minAge}
                            readOnly
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                            세
                        </span>
                    </div>
                    ~
                    <div className="relative">
                        <input
                            className="bg-gray-100 rounded-full w-full p-1 px-3 text-right pr-8"
                            value={maxAge}
                            readOnly
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                            세
                        </span>
                    </div>
                </section>
                <section className="relative w-full my-3 mt-5">
                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                        <div
                            className="absolute h-2 bg-main-color rounded-full"
                            style={{
                                left: `${minAge}%`,
                                width: `${maxAge - minAge}%`,
                            }}
                        />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={minAge}
                            onChange={handleMinAgeChange}
                            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
                            style={{ top: '0', zIndex: 2 }}
                        />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={maxAge}
                            onChange={handleMaxAgeChange}
                            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
                            style={{ zIndex: 1 }}
                        />
                    </div>
                </section>
            </div>
        </>
    );
};

export default AgeCount;
