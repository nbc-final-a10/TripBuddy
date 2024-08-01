export async function convertToBuffer(inputFile: File) {
    try {
        const arrayBuffer = await inputFile.arrayBuffer();
        const bufferToSharp = Buffer.from(arrayBuffer);
        return bufferToSharp.toString('base64'); // Base64 문자열로 변환하여 반환
    } catch (error) {
        console.error('이미지 변환 중 에러 발생:', error);
        return null;
    }
}
