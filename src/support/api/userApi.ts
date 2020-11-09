import apiCall from '@support/util/apiCall';

export const createSocialUser = async (userInfo: any) => {
  return await apiCall.post('user/login/social', userInfo);
}

export const getMainInfo = async () => {
  return await apiCall.get('main');
};

export const getInitUserInfo = async () => {
  return await apiCall.get('auth/check');
};
