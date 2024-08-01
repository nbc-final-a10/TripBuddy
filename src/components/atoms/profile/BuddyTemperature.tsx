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
        <div className="flex flex-col mx-2">
            {isLabel && (
                <div className="flex justify-between items-center">
                    <span className="xl:text-xl">버디즈 온도</span>
                    {isTempText && (
                        <span className="text-gray-500">
                            {temperature ? `${temperature}°C` : '온도정보없음'}
                        </span>
                    )}
                </div>
            )}
            <div className="w-full rounded-full h-2 bg-[#A67000] mt-1">
                <div
                    className="h-2 rounded-full bg-main-color"
                    style={{ width: `${temperature}%` }}
                ></div>
            </div>
        </div>
    );
};

export default BuddyTemperature;
