import MainPageBanner from '@/components/molecules/mainpage/MainPageBanner';
import MainPageContainer from '@/components/organisms/mainpage/MainPageContainer';

export default function Home() {
    return (
        <div className="bg-gray-300">
            <section>
                <div className="h-44px">
                    <MainPageBanner />
                </div>
                <MainPageContainer />
            </section>
        </div>
    );
}
