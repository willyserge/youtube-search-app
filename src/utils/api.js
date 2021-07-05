import axiosInstance from './axios';

const fetchVideos = async (key) => {
  const res = await axiosInstance.get(`/search?q=${key.queryKey[1]}`);
  return res.data.items;
};

export default fetchVideos;
