import React, { useState } from 'react';

const TravelSelector = () => {
    const [step, setStep] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState('국내');
    const [selectedLocation, setSelectedLocation] = useState('');

    const handleRegionChange = (region: string) => {
        setSelectedRegion(region);
    };

    const handleLocationSelect = (location: string) => {
        setSelectedLocation(location);
    };

    const handleNextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center p-4">
                <h1 className="text-lg font-bold">여행지를 선택해주세요</h1>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full mx-1 ${index <= step ? 'bg-gray-500' : 'bg-gray-200'}`}
                    ></div>
                ))}
            </div>

            {/* Title and Subtitle */}
            <div className="text-center mb-4">
                <h2 className="text-xl font-bold">여행지를 선택해주세요</h2>
                <p className="text-gray-500">
                    지역, 국가, 도시를 1개 선택해주세요.
                </p>
            </div>

            {/* Search Input */}
            <div className="flex items-center bg-gray-100 p-2 rounded mb-4 mx-4">
                <span className="material-icons">아이콘</span>
                <input
                    type="text"
                    placeholder="지역, 국가를 찾아보세요"
                    className="bg-gray-100 ml-2 w-full"
                />
            </div>

            {/* Region Tabs */}
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => handleRegionChange('국내')}
                    className={`px-4 py-2 ${selectedRegion === '국내' ? 'bg-gray-300' : 'bg-gray-100'}`}
                >
                    국내
                </button>
                <button
                    onClick={() => handleRegionChange('해외')}
                    className={`px-4 py-2 ${selectedRegion === '해외' ? 'bg-gray-300' : 'bg-gray-100'}`}
                >
                    해외
                </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center mb-4">
                {['인기', '서울', '경기', '충북', '충남', '경남', '경북'].map(
                    region => (
                        <button
                            key={region}
                            onClick={() => handleLocationSelect(region)}
                            className={`px-3 py-1 m-1 ${selectedLocation === region ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
                        >
                            {region}
                        </button>
                    ),
                )}
            </div>

            {/* Location List */}
            <div className="flex flex-col items-start px-4">
                {['서울', '부산'].map(location => (
                    <div
                        key={location}
                        className="flex items-center w-full py-2 border-b"
                    >
                        <div className="bg-gray-300 h-8 w-8 rounded-full mr-4"></div>
                        <div>
                            <div className="font-bold">{location}</div>
                            <div className="text-gray-500">한국</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleNextStep}
                    className="text-2xl bg-gray-700 text-white font-bold py-2 px-8 rounded"
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default TravelSelector;
