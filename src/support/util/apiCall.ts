import axios from 'axios';

const apiCall = axios.create();

apiCall.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
apiCall.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
apiCall.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
apiCall.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default apiCall;
