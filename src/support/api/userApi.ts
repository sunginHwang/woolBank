import apiCall from '../util/apiCall';

export const createSocialUser = async (userInfo: any) => {
  return await apiCall.post('user/login/social', userInfo);
}
