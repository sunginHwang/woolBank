import apiCall from '@support/util/apiCall';
import { ApiResType } from '@models/api/ApiResType';
import { IImage } from '@models/IImage';

export const saveImageAndGetImageUrl = async (imageFile: File): Promise<null | IImage> => {
  const data = await new FormData();
  await data.append('image', imageFile);

  try {
    const result = await apiCall.post<ApiResType<IImage>>('upload', data);

    if (result.status === 200) {
      return result.data.data;
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};
