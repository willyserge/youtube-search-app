import axios from 'axios';

const baseURL = 'https://www.googleapis.com/youtube/v3/';
const key = 'AIzaSyA2Tn0PIR8mRqKqPS4xixx7U7F9zo3Q0RQ';

const axiosInstance = axios.create({
  baseURL,
  params: {
    part: 'snippet',
    maxResults: 5,
    key,
  },
});

export default axiosInstance;
