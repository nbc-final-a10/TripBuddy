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
        <div className="py-3">
            <div className="flex flex-col justify-center items-center mx-auto">
                <section className="flex gap-1.5">
                    <div className="relative">
                        <input
                            className="bg-gray-100 rounded-full w-full p-1 px-3 text-right pr-8"
                            value={minAge}
                            readOnly
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
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
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            세
                        </span>
                    </div>
                </section>
                <section className="relative w-full my-3 mt-10">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={minAge}
                        onChange={handleMinAgeChange}
                        className={`absolute w-full h-2 bg-transparent appearance-none pointer-events-auto ${minAge >= maxAge - 10 ? 'z-20' : 'z-10'}`}
                    />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={maxAge}
                        onChange={handleMaxAgeChange}
                        className={`absolute w-full h-2 bg-transparent appearance-none pointer-events-auto ${maxAge <= minAge + 10 ? 'z-20' : 'z-10'}`}
                    />
                    <div className="relative z-0 h-2 bg-gray-200 rounded-full">
                        <div
                            className="absolute h-2 bg-blue-500 rounded-full"
                            style={{
                                left: `${minAge}%`,
                                width: `${maxAge - minAge}%`,
                            }}
                        ></div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AgeCount;
