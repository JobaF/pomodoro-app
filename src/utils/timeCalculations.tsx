export const getMinutesFromSeconds = (timeInSeconds: number): string => {
  const roundedDownMinutes = Math.floor(timeInSeconds / 60);
  return roundedDownMinutes.toString().padStart(2, "0");
};

export const getLeftOverSeconds = (timeInSeconds: number): string => {
  const leftOverSeconds = Math.floor(timeInSeconds % 60);
  return leftOverSeconds.toString().padStart(2, "0");
};
