import { Hangman } from "./hangman";
import { randomWord } from "./data";

export default function Home() {
  return <Hangman initialWord={randomWord()} />;
}
