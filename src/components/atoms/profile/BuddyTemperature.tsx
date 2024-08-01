type BuddyTemperatureProps = {
    temperature: number;
    isLabel?: boolean;
    isTempText?: boolean;
};

const BuddyTemperature = ({
    temperature,
    isLabel = true,
    isTempText = true,
}: BuddyTemperatureProps) => {
    return (
        <div className="flex flex-col mx-8">
            {isLabel && (
                <span className="block text-left xl:text-xl">버디즈 온도</span>
            )}
            {isTempText && (
                <span className="block text-gray-500 text-right">
                    {temperature ? `${temperature}°C` : '온도정보없음'}
                </span>
            )}
            <div className="w-full rounded-full h-2 bg-[#A67000]">
                <div
                    className="h-2 rounded-full bg-main-color"
                    style={{ width: `${temperature}%` }}
                ></div>
            </div>
        </div>
    );
};

export default BuddyTemperature;
