import { emailRegex } from './regexs';
import { showAlert } from './ui/openCustomAlert';

export const validateWhiteSpace = (inputs: string[]) =>
    inputs.some(input => /\s/.test(input));

export const authValidation = (
    email?: string,
    name?: string,
    password?: string,
    passwordConfirm?: string,
) => {
    if (!name || !email || !password || !passwordConfirm)
        return showAlert('caution', '빈 값이 없도록 해주세요');

    if (validateWhiteSpace([name, email, password, passwordConfirm]))
        return showAlert('caution', '공백을 포함할 수 없습니다!');

    if (!emailRegex.test(email))
        return showAlert('caution', '유효한 이메일 주소를 입력하세요!');

    if (!password || !passwordConfirm)
        return showAlert('caution', '비밀번호를 입력해주세요!');

    if (password.length < 8 || password.length > 15)
        return showAlert('caution', '비밀번호는 8~15 글자로 해야합니다!');

    if (password !== passwordConfirm)
        return showAlert('caution', '비밀번호가 일치하지 않습니다!');
};
