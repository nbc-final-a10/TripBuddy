import Image from 'next/image';

const Tuto1Image = () => {
    return (
        <Image
            src="/images/tuto1.png"
            alt="튜토리얼 1페이지 이미지"
            width={500}
            height={500}
        />
    );
};

export default Tuto1Image;
