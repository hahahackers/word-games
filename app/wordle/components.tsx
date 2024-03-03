'use client';

import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import cx from 'clsx';

import { wordle } from '@/app/wordle/store';
import _ from 'lodash';

export const Input = observer(() => {
  const [value, setValue] = useState('');

  return (
    <div className="mb-4 flex justify-center gap-2">
      <input
        minLength={wordle.word.length}
        maxLength={wordle.word.length}
        className="border border-slate-200 rounded p-2"
        type="text"
        placeholder="value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="border border-slate-200 hover:bg-slate-100 rounded p-2"
        disabled={wordle.isWin}
        onClick={() => wordle.submit(value.toLocaleUpperCase())}
      >
        Submit
      </button>
    </div>
  );
});

interface RowProps {
  element?: { letter: string; status: string }[];
}

const Row = observer<RowProps>(({ element }) => {
  if (element) {
    return _.map(element, ({ letter, status }, index) => <Letter key={index} letter={letter} status={status} />);
  }

  return _.times(wordle.word.length, (index) => <Letter key={index} />);
});

interface LetterProps {
  letter?: string;
  status?: string;
}

const Letter = observer<LetterProps>(({ letter = ' ', status = 'none' }) => (
  <span
    className={cx('rounded p-2 w-12 h-12 justify-center items-center flex text-2xl', {
      ['bg-emerald-200']: status === 'correct',
      ['bg-amber-200']: status === 'incorrect',
      ['bg-slate-200']: status === 'none',
    })}
  >
    {letter}
  </span>
));

export const Table = observer(() => (
  <div>
    <ul className="flex flex-col gap-2">
      {_.map(wordle.table, (tableElement, index) => (
        <li key={index} className="flex gap-2 justify-center items-center">
          <Row element={tableElement} />
        </li>
      ))}
    </ul>

    {wordle.isWin && (
      <div>
        <h1 className="text-2xl">You win!</h1>
        <button onClick={() => wordle.reset()}>Play Again</button>
      </div>
    )}

    {wordle.isLose && (
      <div>
        <h1 className="text-2xl">You lost!</h1>
        <button onClick={() => wordle.reset()}>Play Again</button>
      </div>
    )}
  </div>
));
