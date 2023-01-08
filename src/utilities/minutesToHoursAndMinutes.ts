export const minutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  return `${hours}h ${minutesLeft}m`;
};

export const minutesToMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  return hours > 0 ? `${hours}h ${minutesLeft}m` : `${minutesLeft}m`;
};
