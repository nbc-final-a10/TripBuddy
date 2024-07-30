import { useEffect, useState } from 'react';

export default function TopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const dateSection = document.getElementById('date-section');
        if (dateSection) {
            const { top } = dateSection.getBoundingClientRect();
            setIsVisible(window.scrollY > top);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-20 right-5 p-2 bg-main-color text-white rounded-full shadow-lg transition-transform transform xl:right-10 xl:bottom-10"
            >
                Top
            </button>
        )
    );
}
