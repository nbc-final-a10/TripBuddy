import HomePageBanner from '@/components/molecules/homepage/HomePageBanner';
import HomePageContainer from '@/components/organisms/homepage/HomePageContainer';

function HomePage() {
    return (
        <div className="bg-gray-300">
            <section>
                <div className="h-[200px]">
                    <HomePageBanner />
                </div>
                <HomePageContainer />
            </section>
        </div>
    );
}

export default HomePage;
