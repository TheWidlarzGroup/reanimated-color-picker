export const randomFromRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomDelay = Math.floor(Math.random() * 600);

export const CONSTANTS = {
  BUBBLE_INIT_SIZE: 0,
  BUBBLE_SIZE: 56,
  BUBBLES_OFFSET_LEFT: 0,
  BUBBLES_OFFSET_TOP: 130,
  BUBBLES_OFFSET_BOTTOM: 250,
  DROP_AREA_INIT_SIZE: 1000,
  DROP_AREA_OFFSET: 175,
};
