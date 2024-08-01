import sharp from 'sharp';

type ConvertToWebpProps = {
    inputBuffer: Buffer;
    maxWidth: number;
    maxHeight?: number;
};

export async function convertToWebPServer({
    inputBuffer,
    maxWidth = 720,
    maxHeight = 720,
}: ConvertToWebpProps): Promise<Buffer> {
    let image = sharp(inputBuffer, { density: 100 });

    // EXIF 데이터를 기반으로 이미지 회전
    image = image.rotate();

    // 이미지의 원래 크기를 가져옴
    const metadata = await image.metadata();
    let width = metadata.width;
    let height = metadata.height;

    if (width && height) {
        const aspectRatio = width / height;

        // maxWidth와 maxHeight를 사용하여 적절한 크기를 계산
        if (aspectRatio > 1) {
            // 가로가 더 긴 경우
            if (width > maxWidth) {
                width = maxWidth;
                height = Math.floor(maxWidth / aspectRatio);
            }
        } else {
            // 세로가 더 긴 경우
            if (height > maxHeight) {
                height = maxHeight;
                width = Math.floor(maxHeight * aspectRatio);
            }
        }

        image = image.resize(width, height, {
            fit: 'inside', // 이미지가 잘리지 않도록 함
        });
    }

    const buffer = await image.toFormat('webp').toBuffer();
    return buffer;
}

export default async function convertToWebP(
    inputBuffer: string,
    maxWidth: number,
    maxHeight?: number,
) {
    try {
        // Base64 문자열을 Buffer로 디코딩
        const imageBuffer = Buffer.from(inputBuffer, 'base64');
        const convertedBuffer = await convertToWebPServer({
            inputBuffer: imageBuffer,
            maxWidth,
            maxHeight,
        });
        return convertedBuffer;
    } catch (error) {
        console.error('이미지 변환 중 에러 발생 버퍼???:', error);
        return null;
    }
}

// function convertToWebPBlob({
//     inputFile,
//     maxWidth,
//     maxHeight = 720,
// }: ConvertToWebpProps): Promise<Blob> {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (e: ProgressEvent<FileReader>) => {
//             const img = new Image();
//             img.onload = () => {
//                 let width = img.width;
//                 let height = img.height;

//                 // 정방형 이미지 처리
//                 if (width === height) {
//                     // 정방형 이미지의 경우, maxWidth와 maxHeight 중 더 작은 값으로 크기를 조정합니다.
//                     const minSize = Math.min(maxWidth, maxHeight);
//                     width = minSize;
//                     height = minSize;
//                 } else if (width > height) {
//                     // 가로가 세로보다 클 경우
//                     if (width > maxWidth) {
//                         height *= maxWidth / width;
//                         width = maxWidth;
//                     }
//                 } else {
//                     // 세로가 가로보다 클 경우
//                     if (height > maxHeight) {
//                         width *= maxHeight / height;
//                         height = maxHeight;
//                     }
//                 }

//                 const canvas = document.createElement('canvas');
//                 canvas.width = width;
//                 canvas.height = height;
//                 const ctx = canvas.getContext('2d');

//                 if (!ctx) {
//                     reject(new Error('Canvas context를 가져올 수 없습니다.'));
//                     return;
//                 }

//                 ctx.drawImage(img, 0, 0, width, height);

//                 canvas.toBlob(blob => {
//                     if (!blob) {
//                         reject(new Error('Blob을 생성하는 데 실패했습니다.'));
//                         return;
//                     }
//                     resolve(blob);
//                 }, 'image/webp');
//             };

//             img.onerror = () => {
//                 reject(new Error('이미지를 로드하는 데 실패했습니다.'));
//             };

//             if (e.target && e.target.result) {
//                 img.src = e.target.result as string;
//             } else {
//                 reject(new Error('파일을 읽는 데 실패했습니다.'));
//             }
//         };

//         reader.onerror = () => {
//             reject(new Error('파일을 읽는 데 실패했습니다.'));
//         };

//         reader.readAsDataURL(inputFile);
//     });
// }
