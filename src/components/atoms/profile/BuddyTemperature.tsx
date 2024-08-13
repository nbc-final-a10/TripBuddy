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
        '/svg/smile1.svg',
        '/svg/smile2.svg',
        '/svg/smile3.svg',
        '/svg/smile4.svg',
        '/svg/smile5.svg',
    ];

    // 각 아이콘이 활성화될 임계 온도
    const thresholds = [20, 40, 60, 80, 100];

    // 파란색으로 아이콘 바꾸는 로직 현재 온도와 가장 가까운 낮은 임계치를 찾아 그 인덱스를 반환
    const closestThresholdIndex = thresholds.reduce(
        (prevIndex, curr, index) => {
            return temperature >= curr ? index : prevIndex;
        },
        0,
    );

    return (
        <div className="flex flex-col w-full">
            {isLabel && (
                <div className="flex w-full justify-between">
                    <span className="block text-left xl:text-xl">
                        버디즈 지수
                    </span>
                    <span className="text-main-color">
                        {temperature ? `${temperature} %` : '정보없음'}
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
                            // opacity: temperature >= thresholds[index] ? 1 : 0.3,
                            filter:
                                index === closestThresholdIndex
                                    ? 'invert(31%) sepia(41%) saturate(7429%) hue-rotate(201deg) brightness(99%) contrast(106%)'
                                    : 'none',
                        }}
                    />
                ))}
            </div>
            {/* 온도게이지 */}
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
