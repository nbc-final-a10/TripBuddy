'use client';

// Todo: PWA가 이미 설치된 경우 버튼 동작 안 함 => 사용자에게 설치 여부 alert 알림 주기
// Todo: 안드로이드 기기에서도 else문으로 넘어감.
// Todo: 웹 브라우저에서도 기존에 설치된 경우 else문으로 넘어감.

'use client';

import useCheckPwa from '@/hooks/useCheckPwa';
import { useEffect, useState } from 'react';

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

    if (isPwa) {
        return null;
    }

    return (
        <>
            {!isIos && !isAndroid && (
                <p>이 브라우저에서는 설치를 지원하지 않습니다.</p>
            )}
            {isAndroid && (
                <button
                    onClick={handleInstallClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    홈 화면에 추가하기
                </button>
            )}
            ;
        </>
    );
};

export default InstallPromptHandler;
