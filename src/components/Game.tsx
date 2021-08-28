import { useCallback, useEffect, useRef, useState } from 'react';
import { getRandomWord, getEmptyWordArray } from '../utils/WordUtils';
import Hangman from './Hangman';
import Keyboard from './Keyboard';
import Modal from './Modal';
import Toast from './Toast';

import '../sass/game.scss';

enum Statuses {
  NOT_STARTED,
  IN_PROGRESS,
  WON,
  LOST = -1,
}

const Game = () => {
  const [errorCount, setErrorCount] = useState(0);
  const [showRepeatToast, setShowRepeatToast] = useState(false);
  const [word, setWord] = useState<string>(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wordLettersArray, setWordLettersArray] = useState(getEmptyWordArray(word));
  const [gameStatus, setGameStatus] = useState<Statuses>(Statuses.NOT_STARTED);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const showRepeatNotification = () => {
    setShowRepeatToast(true);
    setTimeout(() => {
      setShowRepeatToast(false);
    }, 3000);
  };

  const updateWordArray = (wordLettersArray: string[], letter: string, word: string) => {
    const newGuessedWord = [...wordLettersArray];
    for (let i = 0; i < word.length; i++) {
      const l = word.charAt(i);
      if (l === letter) {
        newGuessedWord[i] = letter;
      }
    }
    if (newGuessedWord.join('') === word) {
      setGameStatus(Statuses.WON);
      focusOnButton();
    }
    setWordLettersArray(newGuessedWord);
  };

  const focusOnButton = () => {
    buttonRef.current?.focus();
  };

  const addToGuessed = useCallback(
    (letter: string) => {
      if (gameStatus === Statuses.WON || gameStatus === Statuses.LOST) {
        return;
      }
      if (gameStatus !== Statuses.IN_PROGRESS) {
        setGameStatus(Statuses.IN_PROGRESS);
      }
      if (!guessedLetters.includes(letter)) {
        setGuessedLetters([...guessedLetters, letter]);
        if (!word.includes(letter)) {
          const newErrorCount = errorCount + 1;
          setErrorCount(newErrorCount);
          if (newErrorCount >= 11) {
            setGameStatus(Statuses.LOST);
            focusOnButton();
          }
        } else {
          updateWordArray(wordLettersArray, letter, word);
        }
      } else {
        showRepeatNotification();
      }
    },
    [gameStatus, guessedLetters, word, errorCount, wordLettersArray]
  );

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.keyCode > 90 || e.keyCode < 65) {
        return;
      }
      const letter = e.key.toUpperCase();
      addToGuessed(letter);
    };
    window.addEventListener('keyup', listener);
    return () => window.removeEventListener('keyup', listener);
  }, [addToGuessed]);

  const resetGame = () => {
    setGameStatus(Statuses.NOT_STARTED);
    setErrorCount(0);
    setGuessedLetters([]);
    const newWord = getRandomWord();
    setWord(newWord);
    setWordLettersArray(getEmptyWordArray(newWord));
    setShowRepeatToast(false);
  };

  const updateWordFromKeyboard = (letter: string) => {
    addToGuessed(letter);
  };

  return (
    <main>
      <h1 className='word'>{wordLettersArray.join(' ')}</h1>
      <Hangman errors={errorCount} dead={errorCount > 10} />
      <Keyboard
        active={gameStatus === Statuses.NOT_STARTED || gameStatus === Statuses.IN_PROGRESS}
        onChange={updateWordFromKeyboard}
        disabledKeys={guessedLetters}
        word={word}
      />
      <Toast show={showRepeatToast} message='Letter Already Added' />
      <Modal
        show={gameStatus === Statuses.WON}
        onCloseClick={resetGame}
        title={<h2 className='modal-title'>Well Done!</h2>}
        modalClass='finish-modal'
      >
        <p className='modal-caption'>You guessed the word correctly!</p>
        <button className='btn-play-again' onClick={resetGame} ref={buttonRef}>
          Play Again?
        </button>
      </Modal>
      <Modal
        show={gameStatus === Statuses.LOST}
        onCloseClick={resetGame}
        title={<h2 className='modal-title'>Oops!</h2>}
        modalClass='finish-modal'
      >
        <p className='modal-caption'>Game Over :(</p>
        <button className='btn-play-again' onClick={resetGame} ref={buttonRef}>
          Play Again?
        </button>
      </Modal>
    </main>
  );
};

export default Game;
