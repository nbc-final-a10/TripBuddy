import Image from 'next/image';
import Link from 'next/link';
import HeaderMyPageLink from './HeaderMyPageLink';

export default function Header() {
    return (
        <header className="hidden xl:flex relative w-[1080px] h-[100px] items-center bg-white justify-between z-50">
            <div className="flex gap-12 items-center font-bold">
                <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={170}
                    height={64}
                    className="w-auto h-auto"
                    priority
                />
                <Link href="/">HOME</Link>
                <Link href="/trips">여정</Link>
                <Link href="/chat">채팅</Link>
            </div>
            <div className="flex gap-12 items-center font-bold">
                <Link href="/login">LOGIN</Link>
                <Link href="/signup">JOIN</Link>
                <HeaderMyPageLink />
            </div>
        </header>
    );
}
