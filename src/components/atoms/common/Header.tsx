export default function Header() {
    return (
        <header className="hidden xl:flex fixed w-[1080px] h-[100px] items-center bg-white justify-between border-b-2 border-gray-400 z-50">
            <div className="flex gap-12">
                <span>로고</span>
                <span>HOME</span>
                <span>여행 리스트</span>
                <span>채팅</span>
            </div>
            <div className="flex gap-12">
                <span>LOGIN</span>
                <span>JOIN</span>
            </div>
        </header>
    );
}
