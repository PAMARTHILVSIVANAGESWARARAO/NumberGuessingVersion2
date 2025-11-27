import axiosInstance from './axiosInstance';

export const getLeaderboard = async () => {
  const response = await axiosInstance.get('/leaderboard');
  return response.data;
};