import Image from 'next/image';

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
    const smileIcons = [
        '/svg/Settings.svg',
        '/svg/Settings.svg',
        '/svg/Settings.svg',
        '/svg/Settings.svg',
        '/svg/Settings.svg',
    ];

    // 각 아이콘이 활성화될 임계 온도
    const thresholds = [20, 40, 60, 80, 100];

    return (
        <div className="flex flex-col w-full">
            {isLabel && (
                <div className="flex w-full justify-between">
                    <span className="block text-left xl:text-xl">
                        버디 온도
                    </span>
                    <span className="text-gray-500">
                        {temperature ? `${temperature} °C` : '온도정보없음'}
                    </span>
                </div>
            )}
            {/* 버디 온도 아이콘 5개 */}
            <div className="flex justify-between mt-1">
                {smileIcons.map((icon, index) => (
                    <Image
                        key={index}
                        src={icon}
                        alt={`smile ${index + 1}`}
                        width={8}
                        height={8}
                        className="xl:w-4 xl:h-4"
                        style={{
                            opacity: temperature >= thresholds[index] ? 1 : 0.3,
                        }}
                    />
                ))}
            </div>
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
