import { makeAutoObservable, reaction } from "mobx";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export class WordleStore {
  word = "HELLO";
  guesses: string[] = ["WORLD", "BLOCK", "LLHHO", "LOOLO", "OOOOO", "ELLOH"];
  MAX_GUESSES = 6;

  get charMap() {
    const map = new Map<string, number[]>();

    for (let letter of ALPHABET) {
      map.set(letter, []);
    }

    this.word.split("").forEach((letter, index) => {
      map.set(letter, map.get(letter)!.concat(index));
    });

    return map;
  }

  get table() {
    const table = Array.from({ length: this.MAX_GUESSES });

    this.guesses.forEach((guess, guessIndex) => {
      const row: { letter: string; status: string }[] = [];

      guess.split("").forEach((letter, letterIndex) => {
        let status = "none";
        if (this.word[letterIndex] === letter) {
          status = "correct";
        }

        row[letterIndex] = { letter, status };
      });
      table[guessIndex] = row;

      guess.split("").forEach((letter, letterIndex) => {
        if (
          this.charMap.get(letter)?.length &&
          row[letterIndex].status !== "correct"
        ) {
          const lettersInWordCount = this.charMap.get(letter)?.length || 0;
          const highlightedLettersInRowCount = row.filter(
            (el) => el.letter === letter && el.status !== "none"
          ).length;

          if (highlightedLettersInRowCount < lettersInWordCount) {
            row[letterIndex] = { letter, status: "incorrect" };
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
    return this.guesses.length === this.MAX_GUESSES;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const wordleStore = new WordleStore();
