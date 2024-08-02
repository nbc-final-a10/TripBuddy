import Image from 'next/image';
import HomePageBannerText from './HomePageBannerText';

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
                    priority
                />
                <div className="absolute inset-0 bg-black/30 z-10" />
                <HomePageBannerText />
            </div>
        </div>
    );
};

export default HomePageBanner;
