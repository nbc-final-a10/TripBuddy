import CustomAlert from "@/components/organisms/common/CustomAlert";
import React from "react";
import ReactDOM from "react-dom/client";

let alertContainer: HTMLDivElement | null = null;
let root: ReactDOM.Root | null = null;

export function showAlert(
    title: "success" | "caution" | "error", // 얼러트 타이틀
    description: string, // 얼러트 설명
    onConfirm?: () => void, // 얼러트 콜백
    isConfirm?: boolean // 버튼 확인,취소 두개 보여질 것인지
): void {
    if (!alertContainer) {
        alertContainer = document.createElement("div");
        document.body.appendChild(alertContainer);
        root = ReactDOM.createRoot(alertContainer);
    }

    const onClose = () => {
        if (root && alertContainer) {
            root.unmount();
            document.body.removeChild(alertContainer);
            alertContainer = null;
            root = null;
        }
    };

    const handleConfirm = () => {
        onClose();
        if (onConfirm) onConfirm(); // 확인 버튼을 눌렀을 때 추가 동작 실행
    };

    if (root) {
        root.render(
            React.createElement(CustomAlert, {
                title: title,
                description: description,
                isConfirm: isConfirm,
                onClose: handleConfirm,
                onJustClose: onClose,
            })
        );
    }
}

export function hideAlert() {
    if (root && alertContainer) {
        root.unmount();
        document.body.removeChild(alertContainer);
        alertContainer = null;
        root = null;
    }
}
