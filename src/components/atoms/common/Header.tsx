import Image from 'next/image';
import Link from 'next/link';
import HeaderMyPageLink from './HeaderMyPageLink';
import { twMerge } from 'tailwind-merge';

type HeaderProps = {
    pathname: string | null;
};

export default function Header({ pathname }: HeaderProps) {
    return (
        <header
            className={twMerge(
                'hidden xl:flex relative w-[1080px] h-[100px] items-center bg-white justify-between z-50',
                pathname === '/tutorial' && 'xl:hidden',
            )}
        >
            <div className="flex gap-12 items-center justify-start font-bold w-[80%]">
                <Link href="/" className="relative w-[170px] h-[64px]">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        fill
                        className="w-auto h-auto"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
