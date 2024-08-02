import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="hidden xl:flex relative w-[1080px] h-[100px] items-center bg-white justify-between z-50">
            <div className="flex gap-12 items-center">
                <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={170}
                    height={64}
                />
                <Link href="/">HOME</Link>
                <Link href="/trips">여행 리스트</Link>
                <Link href="/chat">채팅</Link>
            </div>
            <div className="flex gap-12">
                <Link href="/login">LOGIN</Link>
                <Link href="/signup">JOIN</Link>
            </div>
        </header>
    );
}
