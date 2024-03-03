import { WordleStore } from './store';

describe('kek', () => {
  it('should correctly set up the char map', () => {
    const store = new WordleStore();

    store.word = 'HELLO';

    expect(store.charMap).toEqual(
      new Map([
        ['A', []],
        ['B', []],
        ['C', []],
        ['D', []],
        ['E', [1]],
        ['F', []],
        ['G', []],
        ['H', [0]],
        ['I', []],
        ['J', []],
        ['K', []],
        ['L', [2, 3]],
        ['M', []],
        ['N', []],
        ['O', [4]],
        ['P', []],
        ['Q', []],
        ['R', []],
        ['S', []],
        ['T', []],
        ['U', []],
        ['V', []],
        ['W', []],
        ['X', []],
        ['Y', []],
        ['Z', []],
      ]),
    );
  });
  it('should correctly highlight letters', () => {
    const store = new WordleStore();
    store.word = 'HELLO';

    store.submit('WORLD');
    store.submit('BLOCK');
    store.submit('LLHHO');
    store.submit('LOOLO');
    store.submit('OOOOO');
    store.submit('ELLOH');

    expect(store.table).toEqual([
      [
        { letter: 'W', status: 'none' },
        { letter: 'O', status: 'incorrect' },
        { letter: 'R', status: 'none' },
        { letter: 'L', status: 'correct' },
        { letter: 'D', status: 'none' },
      ],
      [
        { letter: 'B', status: 'none' },
        { letter: 'L', status: 'incorrect' },
        { letter: 'O', status: 'incorrect' },
        { letter: 'C', status: 'none' },
        { letter: 'K', status: 'none' },
      ],
      [
        { letter: 'L', status: 'incorrect' },
        { letter: 'L', status: 'incorrect' },
        { letter: 'H', status: 'incorrect' },
        { letter: 'H', status: 'none' },
        { letter: 'O', status: 'correct' },
      ],
      [
        { letter: 'L', status: 'incorrect' },
        { letter: 'O', status: 'none' },
        { letter: 'O', status: 'none' },
        { letter: 'L', status: 'correct' },
        { letter: 'O', status: 'correct' },
      ],
      [
        { letter: 'O', status: 'none' },
        { letter: 'O', status: 'none' },
        { letter: 'O', status: 'none' },
        { letter: 'O', status: 'none' },
        { letter: 'O', status: 'correct' },
      ],
      [
        { letter: 'E', status: 'incorrect' },
        { letter: 'L', status: 'incorrect' },
        { letter: 'L', status: 'correct' },
        { letter: 'O', status: 'incorrect' },
        { letter: 'H', status: 'incorrect' },
      ],
    ]);
  });
});
