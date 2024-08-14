import SelectRegions from '@/components/molecules/common/SelectRegion';

export type AlertProps = {
    onConfirm?: () => void;
    isConfirm?: boolean;
    onCancel?: () => void;
};

export type AlertModalOptions = {
    title: 'success' | 'caution' | 'error'; // 얼러트 타이틀
    description: string; // 얼러트 설명
    options: AlertProps; // 옵션 객체
};

export type ModalContextType = {
    open: (options: AlertModalOptions) => void;
    close: () => void;
    openModal: (options: ModalOptions) => void;
    closeModal: () => void;
};

export type ModalOptions = {
    component: () => React.JSX.Element;
    // options: ReturnType<typeof SelectRegions>;
};
