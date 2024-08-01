import Chip from '@/components/atoms/common/O_Chip';
import { MeetingPlace } from '@/types/MeetingPlace.types';
import React from 'react';

const meetingPlaceOptions: MeetingPlace[] = ['출발지', '여행지'];

type MeetingPlaceChipGroupProps = {
    selectedMeetingPlace: string | null;
    setSelectedMeetingPlace: (place: string | null) => void;
};

const MeetingPlaceChipGroup: React.FC<MeetingPlaceChipGroupProps> = ({
    selectedMeetingPlace,
    setSelectedMeetingPlace,
}) => {
    const handleMeetingPlaceClick = (place: string) => {
        const isSelected = selectedMeetingPlace === place;
        const newSelectedMeetingPlace = isSelected ? null : place;

        setSelectedMeetingPlace(newSelectedMeetingPlace);
    };

    return (
        <div className="mt-3 mb-5">
            <div className="flex gap-1.5">
                {meetingPlaceOptions.map(place => (
                    <Chip
                        key={place}
                        intent="natural"
                        selected={selectedMeetingPlace === place}
                        onClick={() => handleMeetingPlaceClick(place)}
                        // className="w-1/2"
                    >
                        {place}
                    </Chip>
                ))}
            </div>
        </div>
    );
};
export default MeetingPlaceChipGroup;
