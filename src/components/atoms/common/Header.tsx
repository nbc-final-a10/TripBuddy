import Link from 'next/link';

export default function Header() {
    return (
        <header className="hidden xl:flex relative w-[1080px] h-[100px] items-center bg-white justify-between border-b-2 border-gray-400 z-50">
            <div className="flex gap-12">
                <span>로고</span>
                <Link href="/">HOME</Link>
                <span>여행 리스트</span>
                <Link href="/chat">채팅</Link>
            </div>
            <div className="flex gap-12">
                <Link href="/login">LOGIN</Link>
                <Link href="/signup">JOIN</Link>
            </div>
        </header>
    );
}
