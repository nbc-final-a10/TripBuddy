import Chip from '../common/O_Chip';
import { SecondLevelNames } from '@/types/Location.types';

function LocationList({
    locations,
    selectedLocationName,
    onChipClick,
}: {
    locations: SecondLevelNames[];
    selectedLocationName: string;
    onChipClick: (name: string) => void;
}) {
    return (
        <div className="flex flex-nowrap gap-2 py-3 whitespace-nowrap mb-5 overflow-x-auto">
            {locations.map(subLocation => (
                <div key={subLocation} className="flex-none">
                    <Chip
                        intent={subLocation}
                        selected={selectedLocationName === subLocation}
                        onClick={() => onChipClick(subLocation)}
                    >
                        {subLocation}
                    </Chip>
                </div>
            ))}
        </div>
    );
}

export default LocationList;
