import SearchBar from '@/components/atoms/common/M_SearchBar';
import Input from '@/components/atoms/common/O_Input';
import Image from 'next/image';
import Link from 'next/link';

const HomePageSearchBar = () => {
    return (
        <div className="w-full flex justify-between items-center mt-4">
            <SearchBar />
            <div className="h-9 w-[300px] rounded-3xl bg-gray-200 [@media(min-width:1280px)]:flex hidden items-center px-3">
                <Image
                    src="/svg/Place.svg"
                    alt="Place"
                    width={20}
                    height={20}
                />
                <div className="bg-transparent text-xs px-2">
                    지역, 국가를 찾아보세요
                </div>
            </div>
            <div className="h-9 w-[300px] rounded-3xl bg-gray-200 [@media(min-width:1280px)]:flex hidden items-center px-3">
                <Image src="/svg/Date.svg" alt="Place" width={20} height={20} />
                <div className="bg-transparent text-xs px-2">
                    24.07.20 (토) ~ 24.07.21 (일)
                </div>
            </div>
            <Link href="/search">
                <button className="cursor-pointer bg-main-color h-9 w-[114px] rounded-[8px] text-white [@media(min-width:1280px)]:flex hidden items-center justify-center text-xs">
                    검색하기
                </button>
            </Link>
        </div>
    );
};

export default HomePageSearchBar;
