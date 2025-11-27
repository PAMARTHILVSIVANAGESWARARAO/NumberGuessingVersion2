import axiosInstance from './axiosInstance';

export const getAIHint = async (lastGuess, clues) => {
  const response = await axiosInstance.post('/ai/hint', {
    last_guess: lastGuess,
    clues: clues
  });
  return response.data;
};