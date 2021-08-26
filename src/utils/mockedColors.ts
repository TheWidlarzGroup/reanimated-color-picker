type ColorProps = {
  id: number;
  color: string;
};

const randomColor = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16);

export const COLORS: ColorProps[] = [
  {
    color: randomColor(),
    id: 1,
  },
  {
    color: randomColor(),
    id: 2,
  },
  {
    color: randomColor(),
    id: 3,
  },
  {
    color: randomColor(),
    id: 4,
  },
  {
    color: randomColor(),
    id: 5,
  },
  {
    color: randomColor(),
    id: 6,
  },
  {
    color: randomColor(),
    id: 7,
  },
  {
    color: randomColor(),
    id: 8,
  },
  {
    color: randomColor(),
    id: 9,
  },
  {
    color: randomColor(),
    id: 10,
  },
  {
    color: randomColor(),
    id: 11,
  },
  {
    color: randomColor(),
    id: 12,
  },
  {
    color: randomColor(),
    id: 13,
  },
  {
    color: randomColor(),
    id: 14,
  },
  {
    color: randomColor(),
    id: 15,
  },
  {
    color: randomColor(),
    id: 16,
  },
  {
    color: randomColor(),
    id: 17,
  },
  {
    color: randomColor(),
    id: 18,
  },
];
