type LocationToggleButtonProps = {
    isKoreaSelected: boolean;
    onKoreaClick: () => void;
    onGlobalClick: () => void;
    firstLabel: string;
    secondLabel: string;
};

export default function LocationToggleButton({
    isKoreaSelected,
    onKoreaClick,
    onGlobalClick,
    firstLabel,
    secondLabel,
}: LocationToggleButtonProps) {
    return (
        <div className="flex cursor-pointer ml:4 xl:py-1 bg-gray-200 rounded-full p-1 w-full xl:w-[40%]">
            <div
                onClick={() => {
                    onKoreaClick();
                }}
                className={`rounded-full px-4 py-0.5 xl:py-1 w-1/2 text-center transition duration-300 ease-in-out font-semibold ${isKoreaSelected ? 'bg-white text-black' : 'bg-gray-200 text-white'}`}
            >
                {firstLabel}
            </div>
            <div
                onClick={() => {
                    onGlobalClick();
                }}
                className={`rounded-full px-4 py-0.5 w-1/2 text-center transition duration-300 ease-in-out font-semibold ${!isKoreaSelected ? 'bg-white text-black' : 'bg-gray-200 text-white'}`}
            >
                {secondLabel}
            </div>
        </div>
    );
}
