import Footer from '@/components/molecules/Footer';
import Header from '@/components/molecules/Header';
import TapMenu from '@/components/molecules/TapMenu';
import { PropsWithChildren } from 'react';

function ProviderLayout({ children }: PropsWithChildren) {
    return (
        <main className="bg-slate-50 xl:bg-white">
            <section className="w-[375px] mx-auto bg-white xl:w-[1280px] min-h-screen relative">
                <Header />
                {children}
                <TapMenu />
            </section>
        </main>
    );
}

export default ProviderLayout;
