import React from 'react';
import Arrow_Back from '../../../../public/svg/Arrow_back.svg';
import Close from '../../../../public/svg/Close.svg';
import Notification from '../../../../public/svg/Notifications_unread.svg';
import Search from '../../../../public/svg/Search.svg';
import Settings from '../../../../public/svg/Settings.svg';

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

type MobileHeaderProps = {
    title?: string;
    close?: boolean;
    notification?: boolean;
    search?: boolean;
    settings?: boolean;
    edit?: boolean;
};

const MobileHeader: React.FC<MobileHeaderProps> = ({
    title,
    close,
    notification,
    search,
    settings,
    edit,
}) => {
    return (
        <header className="h-[57px] w-full flex flex-row items-center px-5 xl:hidden">
            <div className="w-[calc(100%/3)] flex justify-start items-center">
                <Arrow_Back />
            </div>
            <div className="w-[calc(100%/3)] flex justify-center items-center">
                {title && <h1 className="text-center leading-3">{title}</h1>}
            </div>

            <div className="w-[calc(100%/3)] flex justify-end items-center gap-2">
                {search && <Search />}
                {notification && <Notification />}
                {settings && <Settings />}
                {edit && <span>수정</span>}
                {close && <Close />}
            </div>
        </header>
    );
};

export default MobileHeader;
