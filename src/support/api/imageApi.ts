import apiCall from '../util/apiCall';

const BLOG_API = 'https://api-blog.woolta.com';
const IMAGE_API = 'https://image.woolta.com';

export const saveImageAndGetImageUrl = async (imageFile: File) => {
  const data = await new FormData();
  await data.append('imageFile', imageFile);

  try {
    const result = await apiCall.post(`${BLOG_API}/file/upload/image`, data);

    if (result.status === 200 && result.data.code === 'SUCCESS') {
      return `${IMAGE_API}/${result.data.data.originFileName}`;
    } else {
      alert('이미지 업로드에 실패하였습니다.');
    }
  } catch (e) {
    alert('이미지 업로드에 실패하였습니다.');
  }

  return '';
};
