import axios from 'axios';

const baseURL = 'https://www.googleapis.com/youtube/v3/';
const key = process.env.REACT_APP_YOUTUBE_API_KEY;

const youtubeInstance = axios.create({
  baseURL,
  params: {
    part: 'snippet',
    maxResults: 10,
    key,
  },
});

export default youtubeInstance;
