import ProfileEditColumn from '@/components/atoms/profile/ProfileEditColumn';
import { BuddyProfileProps } from '@/types/ProfileParams.types';
import React from 'react';
import Image from 'next/image';
import { Buddy } from '@/types/Auth.types';
import EditProfileSkeleton from '@/components/molecules/profile/EditProfileSkeleton';
import MascotImage from '@/components/atoms/common/O_MascotImage';

type EditProfilePageProps = {
    buddy: Buddy;
};

function EditProfilePage({ buddy }: EditProfilePageProps) {
    if (!buddy) {
        return <EditProfileSkeleton />;
    }

    return (
        <div className="flex flex-col items-center p-4min-h-screen">
            <div className="w-full max-w-lg rounded-lg p-6">
                <div className="flex flex-col items-center mt-6">
                    <div className="relative">
                        {/* 프로필 이미지 */}
                        <Image
                            src={
                                buddy?.buddy_profile_pic ||
                                '/images/mascot_happy.webp'
                            }
                            alt="profile"
                            width={100}
                            height={100}
                            className="rounded-full w-[100px] h-[100px]"
                        />

                        {/* 프로필 사진 변경 버튼 */}
                        <button className="absolute bottom-0 right-0 p-2 bg-gray-200 rounded-full border-4 border-white">
                            <svg
                                className="w-4 h-4 xl:w-6 xl:h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <button className="mt-2">프로필 사진 삭제</button>
                    <p className="mt-2 text-gray-500">
                        카카오 로그인 상태입니다
                    </p>
                </div>
                <div className="mt-6">
                    <table className="w-full">
                        <tbody>
                            <ProfileEditColumn label="닉네임" value="김버디" />
                            <ProfileEditColumn label="성별" value="여성" />
                            <ProfileEditColumn label="출생년도" value="1997" />
                            <ProfileEditColumn
                                label="소개"
                                value="맛집, 예쁜 카페 탐방 좋아해요~!"
                            />
                            <ProfileEditColumn label="MBTI" value="ENFP" />
                            <ProfileEditColumn
                                label="거주지"
                                value="경기도 수원"
                            />
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">
                                    선호 여정
                                </td>
                                <td className="w-1/2 text-blue-500 text-right">
                                    &gt;
                                </td>
                            </tr>
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">
                                    버디즈 성향
                                </td>
                                <td className="w-1/2 text-blue-500 text-right">
                                    &gt;
                                </td>
                            </tr>
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">
                                    비밀번호 변경
                                </td>
                                <td className="w-1/2 text-blue-500 text-right">
                                    &gt;
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EditProfilePage;
