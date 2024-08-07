'use client';
import Image from 'next/image';
import Link from 'next/link';
import HeaderMyPageLink from './HeaderMyPageLink';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    return (
        <header className="hidden xl:flex relative w-[1080px] h-[100px] items-center bg-white justify-between z-50">
            <div className="flex gap-12 items-center justify-start font-bold w-[80%]">
                <Link href="/" className="w-[170px]">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={170}
                        height={64}
                        className="w-auto h-auto"
                        priority
                    />
                </Link>
                <div className="flex gap-10 items-center justify-center flex-1 underline-offset-4 decoration-2">
                    <Link
                        href="/"
                        className={
                            pathname === '/'
                                ? 'text-primary-color-400 underline'
                                : 'text-black'
                        }
                    >
                        HOME
                    </Link>
                    <Link
                        href="/trips"
                        className={
                            pathname === '/trips'
                                ? 'text-primary-color-4000 underline'
                                : 'text-black'
                        }
                    >
                        여정
                    </Link>
                    <Link
                        href="/chat"
                        className={
                            pathname === '/chat'
                                ? 'text-primary-color-400 underline'
                                : 'text-black'
                        }
                    >
                        채팅
                    </Link>
                </div>
            </div>

            <HeaderMyPageLink />
        </header>
    );
}
