export const getLeftOverSeconds = (timeInMinutes: number): string => {
  const roundedDownMinutes = Math.floor(timeInMinutes);
  const leftOverSeconds = (timeInMinutes - roundedDownMinutes) * 60;
  return leftOverSeconds.toString().padStart(2, "0");
};
