import { makeAutoObservable, set } from 'mobx';
import _ from 'lodash';
import { words } from '@/app/wordle/data/words';
import { ALPHABET } from '@/app/common/constants';

interface TableEntry {
  letter: string;
  status: string;
}

export class WordleStore {
  word = _.sample(words)!;
  guesses: string[] = [];
  MAX_GUESSES = 6;

  get charMap() {
    const map = new Map<string, number[]>(_.map(ALPHABET, (letter) => [letter, []]));

    _.each(this.word, (letter, index) => {
      map.set(letter, map.get(letter)!.concat(index));
    });

    return map;
  }

  get table() {
    const table: TableEntry[][] = Array.from({ length: this.MAX_GUESSES });

    _.each(this.guesses, (guess, guessIndex) => {
      const row: TableEntry[] = [];

      _.each(guess, (letter, letterIndex) => {
        let status = 'none';

        if (this.word.at(letterIndex) === letter) {
          status = 'correct';
        }

        _.set(row, letterIndex, { letter, status });
      });

      _.set(table, guessIndex, row);

      _.each(guess, (letter, letterIndex) => {
        if (_.size(this.charMap.get(letter)) && _.get(row, [letterIndex, 'status']) !== 'correct') {
          const lettersInWordCount = _.size(this.charMap.get(letter));
          const highlightedLettersInRowCount = _.size(_.filter(row, (e) => e.letter === letter && e.status !== 'none'));

          if (highlightedLettersInRowCount < lettersInWordCount) {
            _.set(row, letterIndex, { letter, status: 'incorrect' });
          }
        }
      });
    });

    return table;
  }

  submit(word: string) {
    this.guesses.push(word);
  }

  get isWin() {
    return this.guesses.includes(this.word);
  }

  get isLose() {
    return !this.isWin && this.guesses.length === this.MAX_GUESSES;
  }

  reset() {
    this.word = _.sample(words)!;
    this.guesses = [];
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const wordle = new WordleStore();
