'use client';

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from 'react';
import CustomAlert from '@/components/organisms/common/CustomAlert';
import { ModalContextType, ModalOptions } from '@/types/Modal.types';
import { useLockBodyScroll } from '@/hooks';

const initialValue: ModalContextType = {
    open: () => {},
    close: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialValue);

export const useModal = () => useContext(ModalContext);

export const ModalProviderDefault: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

    const { setLock } = useLockBodyScroll();

    const open = useCallback(
        (options: ModalOptions) => {
            setModalOptions(options);
            setLock(true);
        },
        [setLock],
    );

    const close = useCallback(() => {
        if (modalOptions?.options.onConfirm) modalOptions.options.onConfirm();
        setLock(false);
        setModalOptions(null);
    }, [modalOptions, setLock]);

    const onCancel = useCallback(() => {
        if (modalOptions?.options.onCancel) modalOptions.options.onCancel();
        setLock(false);
        setModalOptions(null);
    }, [modalOptions, setLock]);

    useEffect(() => {
        setLock(false);
    }, [setLock]);

    return (
        <ModalContext.Provider value={{ open, close }}>
            {children}
            {modalOptions && (
                <CustomAlert
                    title={modalOptions.title}
                    description={modalOptions.description}
                    isConfirm={modalOptions.options.isConfirm}
                    onCancel={onCancel}
                    onClose={close}
                />
            )}
        </ModalContext.Provider>
    );
};
