import Chip from '@/components/atoms/common/O_Chip';
import SearchPageChipsTitle from './SearchMainPageChipsTitle';
import { MeetingPlace } from '@/types/MeetingPlace.types';
import { useState } from 'react';

const meetingPlaceOptions: MeetingPlace[] = ['출발지', '여행지'];

const MeetingPlaceChipGroup = () => {
    const [selectedMeetingPlace, setSelectedMeetingPlace] = useState<
        string | null
    >(null);

    const handleMeetingPlaceClick = (place: string) => {
        setSelectedMeetingPlace(prevSelectedPlace =>
            prevSelectedPlace === place ? null : place,
        );
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
