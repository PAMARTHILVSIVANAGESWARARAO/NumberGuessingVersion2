import axiosInstance from './axiosInstance';

export const startGame = async () => {
  const response = await axiosInstance.post('/game/start');
  return response.data;
};

export const makeGuess = async (guess) => {
  const response = await axiosInstance.post('/game/guess', { guess });
  return response.data;
};

export const getGameHistory = async (limit = 10) => {
  const response = await axiosInstance.get(`/game/history?limit=${limit}`);
  return response.data;
};