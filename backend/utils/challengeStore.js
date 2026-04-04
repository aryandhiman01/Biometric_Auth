const challenges = new Map();

export const setChallenge = (email, challenge) => {
  challenges.set(email, challenge);
};

export const getChallenge = (email) => {
  return challenges.get(email);
};

export const deleteChallenge = (email) => {
  challenges.delete(email);
};