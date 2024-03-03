import { Hangman } from './hangman';
import { words } from '@/app/hangman/data/words';
import _ from 'lodash';

export default function Home() {
  return <Hangman initialWord={_.sample(words)!.toLocaleUpperCase()} />;
}
