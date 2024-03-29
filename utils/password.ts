import getRandomInteger from './random';

export const characterSets = {
  uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  symbols: ['$', '%', '!', '#', '^', '@', '&', '*'],
  hex: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
};

type CharacterSet = keyof typeof characterSets

export const getCharacterSet = (sets: (CharacterSet | string & {})[]): string[] => (
  sets.reduce<string[]>((acc, curr) => (
    Array.from(new Set(([...acc, ...(characterSets[curr as CharacterSet] || curr.split(''))])))
  ), [])
);

const getRandomFromSet = (set: string[]): string => {
  const position = getRandomInteger(0, set.length - 1);

  return set[position];
};

const generatePassword = (length: number, set: string[]): string => {
  const password = [...new Array(length)].map(() => (
    getRandomFromSet(set)
  ));

  return password.join('');
};

export default generatePassword;
