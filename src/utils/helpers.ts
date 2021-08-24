export const randomFromRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomDelay = Math.floor(Math.random() * 600);
