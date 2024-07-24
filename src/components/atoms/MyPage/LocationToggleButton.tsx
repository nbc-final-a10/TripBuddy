type LocationToggleButtonProps = {
    isDomesticSelected: boolean;
    onDomesticClick: () => void;
    onOverseasClick: () => void;
    firstLabel: string;
    secondLabel: string;
};

const LocationToggleButton = ({
    isDomesticSelected,
    onDomesticClick,
    onOverseasClick,
    firstLabel,
    secondLabel,
}: LocationToggleButtonProps) => (
    <div className="flex cursor-pointer bg-gray-200 rounded-full p-1 w-[200px] xl:w-[400px]">
        <div
            onClick={onDomesticClick}
            className={`rounded-full px-4 py-0.5 w-1/2 text-center transition duration-300 ease-in-out font-semibold ${isDomesticSelected ? 'bg-white text-black' : 'bg-gray-200 text-black'}`}
        >
            {firstLabel}
        </div>
        <div
            onClick={onOverseasClick}
            className={`rounded-full px-4 py-0.5 w-1/2 text-center transition duration-300 ease-in-out font-semibold ${!isDomesticSelected ? 'bg-white text-black' : 'bg-gray-200 text-black'}`}
        >
            {secondLabel}
        </div>
    </div>
);

export default LocationToggleButton;
