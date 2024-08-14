'use client';

import React, { useEffect, useState } from 'react';
import Arrow_Back from '../../../../public/svg/Arrow_back.svg';
import Close from '../../../../public/svg/Close.svg';
import Notification from '../../../../public/svg/Alarm.svg';
import Search from '../../../../public/svg/HomeSearch.svg';
import MobileHeaderSettingsButton from '@/components/atoms/common/MobileHeaderSettingsButton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks';
import { useModal } from '@/contexts/modal.context';
import { getTrip } from '@/api-services/trips';
import { TripWithContract } from '@/types/Trips.types';

const MobileHeader: React.FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { buddy } = useAuth();
    const modal = useModal();
    const [trip, setTrip] = useState<TripWithContract | null>(null);
    const uuidMatch = pathname.match(/\/([^\/]+)\/([0-9a-fA-F-]{36})$/);
    const uuid = uuidMatch ? uuidMatch[2] : null;
    const isMyProfile = uuid === buddy?.buddy_id;

    const isTrips = pathname === '/trips';
    const isTripDetail = pathname.startsWith('/trips/');
    const isStory = pathname.startsWith('/stories');
    const isChatId = pathname.startsWith('/chat/');
    const isChat = pathname === '/chat';
    const isLogin = pathname === '/login';
    const isRecover = searchParams.get('mode') === 'recover';
    const isSignup = pathname === '/signup';
    const isSearch = pathname === '/search';
    const isWrite = pathname === '/write';
    const isOnboarding = pathname === '/onboarding';
    const isProfile = pathname.startsWith('/profile/');
    const isEditTrips = pathname.startsWith('/edit/trips');
    const isStoryWrite = pathname === '/write/story';
    const isNotification = pathname === '/notifications';

    // const { data: trip } = useTripQuery(isTripDetail && uuid ? uuid : null);

    const headerTitle =
        (isTrips && '모집중 여정') ||
        (isTripDetail && '여정 보기') ||
        (isWrite && '여정 작성') ||
        (isLogin && '') ||
        (isSignup && '') ||
        (isSearch && '검색') ||
        (isOnboarding && '온보딩') ||
        (isProfile && isMyProfile && '마이페이지') ||
        (isProfile && !isMyProfile && '프로필') ||
        (isStory && '버디즈 스토리') ||
        (isStoryWrite && '스토리에 추가') ||
        (isChatId && '') ||
        (isChat && '채팅') ||
        (isNotification && '알림') ||
        (isRecover && '비밀번호 찾기') ||
        (isEditTrips && '');

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
        isChat ||
        isNotification ||
        isRecover ||
        isEditTrips;

    const handleBack = () => {
        if (isRecover) {
            router.push('/login?mode=login');
        } else if (isLogin || isSignup) {
            router.push('/');
        } else if (isEditTrips) {
            router.push(`/trips/${uuid}`);
            modal.closeModal();
        } else {
            router.back();
        }
    };

    useEffect(() => {
        async function fetchTrip() {
            if (uuid) {
                const trip = await getTrip(uuid);
                setTrip(trip);
            }
        }
        if (!isProfile) fetchTrip();
    }, [uuid, isProfile]);

    if (!isShow) return null;

    return (
        <header className="relative h-[57px] w-full flex flex-row items-center px-5 xl:hidden bg-white">
            <div className="w-[calc(100%/3)] flex justify-start items-center">
                <Arrow_Back onClick={handleBack} className="cursor-pointer" />
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
                {isTrips && (
                    <Notification
                        onClick={() => router.push('/notifications')}
                        className="cursor-pointer"
                    />
                )}
                {isProfile && uuid && (
                    <MobileHeaderSettingsButton uuid={uuid} />
                )}
                {/** 수정페이지 구현하면 수정으로 가게 추후 수정 요망 */}
                {isTripDetail &&
                    trip &&
                    trip.trip_master_id === buddy?.buddy_id && (
                        <span>수정</span>
                    )}
                {(isSearch || isWrite) && (
                    <Close
                        onClick={() => router.push('/trips')}
                        className="cursor-pointer fill-black"
                    />
                )}
                {/* {isEditTrips && (
                    <Close
                        onClick={() => modal.closeModal()}
                        className="cursor-pointer fill-black"
                    />
                )} */}
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
