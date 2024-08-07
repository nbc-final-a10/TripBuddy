export type AlertProps = {
    onConfirm?: () => void;
    isConfirm?: boolean;
    onCancel?: () => void;
};

export type ModalOptions = {
    title: 'success' | 'caution' | 'error'; // 얼러트 타이틀
    description: string; // 얼러트 설명
    options: AlertProps; // 옵션 객체
};

export type ModalContextType = {
    open: (options: ModalOptions) => void;
    close: () => void;
};
