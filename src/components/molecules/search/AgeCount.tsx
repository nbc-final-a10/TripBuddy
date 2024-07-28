import React, { useState } from 'react';
import SearchPageChipsTitle from './SearchMainPageChipsTitle';

const AgeCount: React.FC = () => {
    const [minAge, setMinAge] = useState(20);
    const [maxAge, setMaxAge] = useState(80);

    const handleMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target), maxAge - 1);
        setMinAge(value);
    };
    const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target), minAge + 1);
        setMinAge(value);
    };

    return (
        <>
            <div className="py-3">
                <SearchPageChipsTitle title="나이" limit="" />
                <div className="flex flex-col justify-center items-center mx-auto">
                    <section className="flex gap-1.5 my-3">
                        <input
                            className="bg-gray-100 rounded-full w-full p-1 px-3 text-right"
                            value={minAge}
                            onChange={e => setMinAge(Number(e.target.value))}
                            readOnly
                        />
                        ~
                        <input
                            className="bg-gray-100 rounded-full w-full p-1 px-3 text-right"
                            value={maxAge}
                            onChange={e => setMinAge(Number(e.target.value))}
                            readOnly
                        />
                    </section>
                    <section className="relative w-full">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={minAge}
                            onChange={handleMinAgeChange}
                            className="absolute w-full h-2 bg-transparent pointer-events-auto appearance-none"
                            style={{ zIndex: minAge > maxAge - 10 ? 1 : 2 }}
                        />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={maxAge}
                            onChange={handleMaxAgeChange}
                            className="absolute w-full h-2 bg-transparent pointer-events-auto appearance-none"
                            style={{ zIndex: maxAge > minAge + 10 ? 2 : 1 }}
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
        </>
    );
};

export default AgeCount;
