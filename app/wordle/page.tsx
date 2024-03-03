"use client";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { wordleStore } from "./store";
import cx from "clsx";
import { stat } from "fs";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface RowProps {
  element?: { letter: string; status: string }[];
}

const Row = observer<RowProps>(({ element }) => {
  if (element)
    return element.map(({ letter, status }, index) => (
      <Letter key={index} letter={letter} status={status} />
    ));

  return Array.from({ length: wordleStore.word.length }).map((_, index) => (
    <Letter key={index} />
  ));
});

interface LetterProps {
  letter?: string;
  status?: string;
}

const Letter = observer<LetterProps>(({ letter = " ", status = "none" }) => (
  <span
    className={cx("bg-slate-200 p-2 w-12 h-10", {
      ["bg-green-200"]: status === "correct",
      ["bg-yellow-200"]: status === "incorrect",
    })}
  >
    {letter}
  </span>
));

const Page = observer(() => {
  const [value, setValue] = useState("");

  return (
    <main className="m-24">
      <div className="mb-4">
        <input
          minLength={wordleStore.word.length}
          maxLength={wordleStore.word.length}
          className="border border-slate-200"
          type="text"
          placeholder="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => wordleStore.submit(value.toLocaleUpperCase())}>
          Submit
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {wordleStore.table.map((tableElement, index) => (
          <li key={index} className="flex gap-2 justify-center items-center">
            <Row element={tableElement} />
          </li>
        ))}
      </ul>
    </main>
  );
});

export default Page;
