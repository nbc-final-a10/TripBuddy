import React from 'react';
import { useAccordion, Accordion } from '@/hooks/useAccordion';
import { BuddyProfileProps } from '@/types/ProfileParams.types';
import { FaCalendarCheck, FaPen } from 'react-icons/fa';

export default function MyTrips({ id }: BuddyProfileProps) {
    const participatingAccordion = useAccordion();
    const createdAccordion = useAccordion();

    return (
        <div className="p-4 bg-gray-100 rounded-xl">
            <Accordion
                title="내가 만든 여정"
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
                icon={<FaPen />}
            >
                내가 만든 여정의 내용
            </Accordion>
            <Accordion
                title="내가 참여한 여정"
                isOpen={participatingAccordion.isOpen}
                toggleAccordion={participatingAccordion.toggleAccordion}
                icon={<FaCalendarCheck />}
            >
                내가 참여한 여정의 내용
            </Accordion>
        </div>
    );
}
