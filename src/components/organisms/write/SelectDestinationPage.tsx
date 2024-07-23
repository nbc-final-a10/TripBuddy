import ProgressIndicator from '@/components/molecules/write/ProgressIndicator';
import SelectDestinationDescription from '@/components/molecules/write/SelectDestinationDescription';
import React, { useState } from 'react';

const SelectDestinationPage = () => {
    const [selectedRegion, setSelectedRegion] = useState('국내');
    const [selectedLocation, setSelectedLocation] = useState('');

    const handleRegionChange = (region: string) => {
        setSelectedRegion(region);
    };

    const handleLocationSelect = (location: string) => {
        setSelectedLocation(location);
    };

    return (
        <div className="flex flex-col h-screen">
            <SelectDestinationDescription />

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
        </div>
    );
};

export default SelectDestinationPage;
