'use client';
import useCheckPwa from '@/hooks/useCheckPwa';
import { useEffect, useState } from 'react';

// TypeScript 인터페이스 정의
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

const InstallPromptHandler = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const isPwa = useCheckPwa();
    const [isIos, setIsIos] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            console.log('beforeinstallprompt event fired');
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler as any);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler as any);
        };
    }, []);

    useEffect(() => {
        const ua = window.navigator.userAgent;
        const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
        const isAndroid = /Android/.test(ua);

        setIsIos(isIOS);
        setIsAndroid(isAndroid);

        if (isPwa) {
            alert('PWA가 이미 설치되었습니다.');
        }
    }, [isPwa]);

    const handleInstallClick = () => {
        console.log('버튼 클릭되었음');
        if (deferredPrompt) {
            (deferredPrompt as any).prompt();
            (deferredPrompt as any).userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null);
            });
        } else {
            alert('설치 가능 여부를 확인할 수 없습니다.');
        }
    };

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js', { type: 'module' }).then(
                function (registration) {
                    console.log(
                        'Service Worker registered with scope:',
                        registration.scope,
                    );
                },
                function (error) {
                    console.log('Service Worker registration failed:', error);
                },
            );
        }

        const handler = (e: BeforeInstallPromptEvent) => {
            console.log('beforeinstallprompt 이벤트 발생', e);
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler as any);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler as any);
        };
    }, []);

    if (isPwa) {
        return null;
    }

    return (
        <button
            onClick={handleInstallClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
            홈 화면에 추가하기
        </button>
    );
};

export default InstallPromptHandler;
