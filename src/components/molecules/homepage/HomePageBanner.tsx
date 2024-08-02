import Image from 'next/image';

const HomePageBanner = () => {
    return (
        <div className="relative h-[200px] z-0">
            <div className="relative text-left font-semibold text-2xl px-4 py-8 h-[230px] flex flex-col justify-end aspect-auto z-0">
                <Image
                    src="/images/test_city.jpg"
                    alt="banner"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 33vw"
                    className="object-cover relative z-0"
                />
                <div className="absolute inset-0 bg-black/30 z-10" />
                <div className="relative z-20 text-white h-full flex flex-col justify-center gap-3">
                    <p>
                        <span className="font-bold text-3xl">여행자</span>님,
                    </p>
                    <p>예정된 대만 여행이</p>
                    <p>
                        <span className="font-bold text-3xl">3일</span>{' '}
                        남았어요!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePageBanner;
