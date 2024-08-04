'use client';

import React from 'react';
import Arrow_Back from '../../../../public/svg/Arrow_back.svg';
import Close from '../../../../public/svg/Close.svg';
import Notification from '../../../../public/svg/Notifications_unread.svg';
import Search from '../../../../public/svg/HomeSearch.svg';
import MobileHeaderSettingsButton from '@/components/atoms/common/MobileHeaderSettingsButton';
import { usePathname, useRouter } from 'next/navigation';

const MobileHeader: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const isTrips = pathname === '/trips';
    const isTripDetail = pathname.startsWith('/trips/');
    const isStory = pathname.startsWith('/stories');
    const isChatId = pathname.startsWith('/chat/');
    const isChat = pathname === '/chat';
    const isLogin = pathname === '/login';
    const isSignup = pathname === '/signup';
    const isSearch = pathname === '/search';
    const isWrite = pathname === '/write';
    const isOnboarding = pathname === '/onboarding';
    const isProfile = pathname.startsWith('/profile/');
    const isStoryWrite = pathname === '/write/story';

    const headerTitle =
        (isTrips && '모집중 여정') ||
        (isTripDetail && '여정 보기') ||
        (isWrite && '여정 작성') ||
        (isLogin && '') ||
        (isSignup && '') ||
        (isSearch && '검색') ||
        (isOnboarding && '온보딩') ||
        (isProfile && '프로필') ||
        (isStory && '스토리') ||
        (isStoryWrite && '스토리에 추가') ||
        (isChatId && '') ||
        (isChat && '채팅');

    const isShow =
        isTrips ||
        isTripDetail ||
        isLogin ||
        isSignup ||
        isSearch ||
        isWrite ||
        isOnboarding ||
        isProfile ||
        isStoryWrite ||
        isStory ||
        isChatId ||
        isChat;

    if (!isShow) return null;

    return (
        <header className="relative h-[57px] w-full flex flex-row items-center px-5 xl:hidden bg-white">
            <div className="w-[calc(100%/3)] flex justify-start items-center">
                <Arrow_Back
                    onClick={
                        isLogin || isSignup
                            ? () => router.push('/')
                            : () => router.back()
                    }
                    className="cursor-pointer"
                />
            </div>
            <div className="w-[calc(100%/3)] flex justify-center items-center">
                <h1 className="text-center leading-3 text-xl font-semibold">
                    {headerTitle}
                </h1>
            </div>

            <div className="w-[calc(100%/3)] flex justify-end items-center gap-2">
                {isTrips && (
                    <Search
                        onClick={() => router.push('/search')}
                        className="cursor-pointer"
                    />
                )}
                {isTrips && <Notification />}
                {isProfile && (
                    <MobileHeaderSettingsButton pathname={pathname} />
                )}
                {isTripDetail && <span>수정</span>}
                {(isSearch || isWrite) && (
                    <Close
                        onClick={() => router.push('/trips')}
                        className="cursor-pointer"
                    />
                )}
            </div>
        </header>
    );
};

export default MobileHeader;

// 필요한 것
// 바뀌는 라벨(필수) v
// 뒤로가기 버튼 (필수) v
// 검색 버튼 돋보기(옵셔널)
// 엑스 버튼 (옵셔널) v
// 알림 버튼 (옵셔널) v
// 수정 버튼 (옵셔널) v
// 설정 버튼 톱니바퀴 (옵셔널) v

// 메인에는 없네...?????

// 검색 /search (뒤로가기, 엑스버튼)
// 위치 검색 /search?mode=location (뒤로가기, 엑스버튼)
// 날짜 선택 /search?mode=date (뒤로가기, 엑스버튼)
// 모집중 여정 /trips (검색버튼돋보기, 알림버튼)
// /write (뒤로가기) <== 웰컴페이지, 여행지 선택, 날짜 선택, 여정 유형 선택, 추가 정보 선택, 여정 글쓰기, 글쓰기 완료
// /write?funnel=welcome (웰컴페이지)
// /write?funnel=selectregion (여행지 선택)
// /write?funnel=selectdate (날짜 선택)
// /write?funnel=selecttripthemes (여정 유형 선택)
// /write?funnel=selectadditionalproperties (추가 정보 선택)
// /write?funnel=writetrip (여정 글쓰기)
// /write?funnel=complete (글쓰기 완료)

// 없음 /trips/[id] (뒤로가기, 수정)
// 채팅방 명 /chat/[id] (뒤로가기)
// 채팅목록 /chat (뒤로가기)
// 마이페이지 /[id] 인데 buddy.buddy_id 가 자신이면 (설정버튼톱니바퀴)
// 프로필 /[id] 인데 buddy.buddy_id 가 자신이 아니면
// 내 정보 수정 /editprofile?? (뒤로가기)
