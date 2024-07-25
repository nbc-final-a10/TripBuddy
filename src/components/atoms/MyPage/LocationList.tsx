import Chip from '../common/O_Chip';
import { SecondLevelNames } from '@/types/Location.types';

function LocationList({
    locations,
    selectedLocationName,
    onChipClick,
}: {
    locations: { name: SecondLevelNames }[];
    selectedLocationName: string;
    onChipClick: (name: string) => void;
}) {
    return (
        <div className="flex flex-nowrap gap-2 py-3 whitespace-nowrap mb-5 overflow-x-auto">
            {locations.map(subLocation => (
                <div key={subLocation.name} className="flex-none">
                    <Chip
                        intent={subLocation.name as SecondLevelNames}
                        selected={selectedLocationName === subLocation.name}
                        onClick={() => onChipClick(subLocation.name)}
                    >
                        {subLocation.name}
                    </Chip>
                </div>
            ))}
        </div>
    );
}

export default LocationList;
