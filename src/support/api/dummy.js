import axios from "axios";

let refreshToken = '';
const axiosAuth = axios.create({
  baseURL: 'http://localhost:4000'
});
axiosAuth.defaults.headers.common["Access-Control-Allow-Headers"] = "*";
axiosAuth.defaults.headers.common["Access-Control-Allow-Methods"] = "*";
axiosAuth.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.data.data.message === "jwt expired" && error.response.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        return axiosAuth
          .post("/auth/refresh-token-check", {
            refreshToken,
          })
          .then(response => {
            setHeaderAuthToken(response.data.data.authTokens);
            originalRequest.headers['bearer_auth'] = response.data.data.authTokens.accessToken;
            return axiosAuth.request(originalRequest)
          });
      } else {
        console.log('진짜 실패 왜>');
        console.log(error);
      }

    }
    return Promise.reject(error);
  }
);

const setHeaderAuthToken = (tokenInfo) => {
  refreshToken = tokenInfo.refreshToken;
  axiosAuth.defaults.headers.common['bearer_auth'] = tokenInfo.accessToken;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const userLogin = async () => {
  const saveInfo = {
    email: "xariby123@nate.com",
    imageUrl: 'http://k.kakaocdn.net/dn/ufixE/btqBTym5cx2/KMlit4NyCYQM6GI3dwEiW0/img_110x110.jpg',
    loginType: 'facebook',
    socialId: '121413'
  };
  return await axiosAuth.post(`http://localhost:4000/user/login/social`, saveInfo);
};

const oAuth = async () => {
  const userInfo = await userLogin();
  setHeaderAuthToken(userInfo.data.data);
  await delay(10000);
  try{
    const result = await axiosAuth.get('/auth/access-check');
    console.log('result');
    console.log(result.data.data);
  }catch(e){
    console.log('최종 에러 진입');
  }
};

oAuth();
