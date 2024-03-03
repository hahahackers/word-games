'use client';
import { useState } from 'react';
import cx from 'clsx';
import { ALPHABET } from '@/app/common/constants';
import _ from 'lodash';
import { words } from '@/app/hangman/data/words';

export function Hangman({ initialWord }: { initialWord: string }) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [word, setWord] = useState(initialWord);
  const [failures, setFailuresLeft] = useState(7);

  const getClassName = (letter: string) =>
    cx('rounded w-10 uppercase disabled:cursor-not-allowed ', {
      ['bg-emerald-200']: guesses.includes(letter) && word.includes(letter),
      ['bg-rose-200']: guesses.includes(letter) && !word.includes(letter),
      ['bg-slate-200']: !guesses.includes(letter),
    });

  const isGuessed = _.every(word, (letter) => guesses.includes(letter.toLocaleUpperCase()));

  const handleGuess = (letter: string) => {
    setGuesses((p) => p.concat(letter));

    if (!word.includes(letter)) {
      setFailuresLeft((p) => p - 1);
    }
  };

  const handleReset = () => {
    setWord(_.sample(words)!.toLocaleUpperCase());
    setGuesses([]);
    setFailuresLeft(7);
  };

  return (
    <main className="flex justify-center items-center mt-40 flex-col">
      <ul className="flex uppercase gap-4 text-3xl mb-6">
        {_.map(word, (letter, index) =>
          guesses.includes(letter.toLocaleUpperCase()) ? <li key={index}>{letter}</li> : <li key={index}>_</li>,
        )}
      </ul>

      {failures > 0 && (
        <ul className="flex gap-2 text-2xl flex-wrap px-4 mb-6 max-w-[680px]">
          {_.map(ALPHABET, (letter, index) => (
            <li key={index}>
              <button
                className={getClassName(letter.toLocaleUpperCase())}
                disabled={guesses.includes(letter)}
                onClick={() => handleGuess(letter)}
              >
                {letter}
              </button>
            </li>
          ))}
        </ul>
      )}

      {failures > 0 ? (
        <p className="text-2xl">Failures left: {failures}</p>
      ) : (
        <p>
          You lose!
          <br />
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={handleReset}>
            Play again
          </button>
        </p>
      )}

      {isGuessed && (
        <p className="text-2xl mt-2">
          You win!
          <br />
          <button className="ml-2 bg-green-500 text-white px-2 py-1 rounded" onClick={handleReset}>
            Play again
          </button>
        </p>
      )}
    </main>
  );
}
