"use client";

// Todo: PWA가 이미 설치된 경우 버튼 동작 안 함 => 사용자에게 설치 여부 alert 알림 주기
// Todo: 모바일 브라우저(사파리, 크롬)에서 PWA 설치 버튼 안 먹히는 증상 해결

import useCheckPwa from '@/hooks/useCheckPwa';
import { useEffect, useState } from 'react';

const InstallPromptHandler = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const isPwa = useCheckPwa();

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler as any);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler as any);
        };
    }, []);

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
        }
    };

    if (isPwa) {
        return null;
    }

    if (!isPwa) {
        return (
            <>
                <button
                    onClick={handleInstallClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    홈 화면에 추가하기
                </button>
            </>
        )
    }
};

export default InstallPromptHandler;