import Chip from '../common/O_Chip';
import { SecondLevel } from '@/types/Location.types';

function LocationList({
    locations,
    selectedLocationName,
    onChipClick,
}: {
    locations: SecondLevel[];
    selectedLocationName: string;
    onChipClick: (name: string) => void;
}) {
    return (
        <div className="flex flex-nowrap gap-2 py-3 whitespace-nowrap mb-5 overflow-x-auto">
            {locations.map(subLocation => (
                <div key={subLocation.name.en} className="flex-none">
                    <Chip
                        intent={subLocation.name.en}
                        selected={selectedLocationName === subLocation.name.en}
                        onClick={() => onChipClick(subLocation.name.ko)}
                    >
                        {subLocation.name.ko}
                    </Chip>
                </div>
            ))}
        </div>
    );
}

export default LocationList;
