import React from 'react';
import { useAccordion, Accordion } from '@/hooks/useAccordion';
import { BuddyProfileProps } from '@/types/ProfileParams.types';

export default function MyTrips({ id }: BuddyProfileProps) {
    const participatingAccordion = useAccordion();
    const createdAccordion = useAccordion();

    return (
        <div className="mt-4 rounded-lg bg-gray-100">
            <Accordion
                title="참여중인 여정"
                isOpen={participatingAccordion.isOpen}
                toggleAccordion={participatingAccordion.toggleAccordion}
            >
                <div>참여 중인 여정 리스트</div>
            </Accordion>

            <Accordion
                title="내가 만든 여정"
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
            >
                <div>내가 만든 여정 리스트</div>
            </Accordion>
        </div>
    );
}
