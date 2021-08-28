import { words, VOWELS } from '../data/data';

export const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
};

export const getEmptyWordArray = (word: string) => {
  const letters: string[] = [];

  for (let i = 0; i < word.length; i++) {
    const ch = word.charAt(i);
    letters.push(VOWELS.includes(ch) ? '*' : '_');
  }

  return letters;
};
