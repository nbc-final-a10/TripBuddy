import { emailRegex } from './regexs';
import { showAlert } from './ui/openCustomAlert';
export const validateWhiteSpace = (inputs: (string | undefined)[]) =>
    inputs?.some(input => input !== undefined && /\s/.test(input));

export const authValidation = (
    email?: string,
    password?: string,
    name?: string,
    passwordConfirm?: string,
) => {
    if (email !== undefined) {
        if (!email) return showAlert('caution', '이메일을 입력해주세요');
        if (!emailRegex.test(email))
            return showAlert('caution', '유효한 이메일 주소를 입력하세요!');
    }

    if (name !== undefined) {
        if (!name) return showAlert('caution', '이름을 입력해주세요');
    }

    if (password !== undefined) {
        if (!password) return showAlert('caution', '비밀번호를 입력해주세요');
        if (password.length < 8 || password.length > 15)
            return showAlert('caution', '비밀번호는 8~15 글자로 해야합니다!');
    }

    if (passwordConfirm !== undefined) {
        if (!passwordConfirm)
            return showAlert('caution', '비밀번호 확인을 입력해주세요');
        if (password !== undefined && password !== passwordConfirm)
            return showAlert('caution', '비밀번호가 일치하지 않습니다!');
    }

    if (validateWhiteSpace([email, name, password, passwordConfirm]))
        return showAlert('caution', '공백을 포함할 수 없습니다!');
};
