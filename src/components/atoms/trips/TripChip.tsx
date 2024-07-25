import React from 'react';

type TripChipProps = {
    label: string;
};

const TripChip: React.FC<TripChipProps> = ({ label }) => {
    return <span className="bg-white text-black">{label}</span>;
};

export default TripChip;
