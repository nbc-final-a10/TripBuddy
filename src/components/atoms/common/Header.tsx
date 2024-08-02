import Image from 'next/image';
import Link from 'next/link';
import MyPageIcon from '../../../../public/svg/mypageicon.svg';

export default function Header() {
    return (
        <header className="hidden xl:flex relative w-[1080px] h-[100px] items-center bg-white justify-between z-50">
            <div className="flex gap-12 items-center font-bold">
                <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={170}
                    height={64}
                />
                <Link href="/">HOME</Link>
                <Link href="/trips">여정</Link>
                <Link href="/chat">채팅</Link>
            </div>
            <div className="flex gap-12 items-center">
                <Link href="/login">LOGIN</Link>
                <Link href="/signup">JOIN</Link>
                <Link href="/">
                    <MyPageIcon />
                </Link>
            </div>
        </header>
    );
}
