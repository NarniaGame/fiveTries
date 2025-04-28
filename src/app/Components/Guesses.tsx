import InputContainer from "./Input"
import SettingsGear from "./SettingsGear"
import { useState, useEffect } from "react";

//// Interfaces for Guesses Components
interface GuessContainerProps {
  allCharacterData: Map<string, string[]>,
  history: string[],
  onGuess: (guess: string) => void,
  todaysAnswer: string,
  onReset: (newAnswer?: string, newShowModal?: boolean) => void;
}

interface GuessBoxProps {
  allCharacterData: Map<string, string[]>,
  history: string[],
  onGuess: (guess: string) => void,
  resetFunc: (newAnswer?: string, newShowModal?: boolean) => void;
}

interface GuessesProps {
  allCharacterData: Map<string, string[]>,
  history: string[],
  todaysAnswer: string
}

interface GuessProps {
  allCharacterData: Map<string, string[]>,
  guess: string,
  todaysAnswer: string,
  isLatest?: boolean
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Begin component declaration
export default function GuessContainer({ allCharacterData, history, onGuess, todaysAnswer, onReset}: GuessContainerProps) {

  return (
    <div className="guess-container flex flex-col items-center justify-center w-full">
      <GuessBox
        allCharacterData={allCharacterData}
        history={history}
        onGuess={onGuess}
        resetFunc={onReset}
      >
      </GuessBox>
    </div>
  )
}

function GuessBox({ allCharacterData, history, onGuess, resetFunc}: GuessBoxProps) {
  return (
    <div className="guessbox relative flex justify-center w-2/3 my-4">
      <InputContainer allCharacterData={allCharacterData} history={history} onGuess={onGuess} />
      <div className="absolute top-0 right-0">
      </div>
    </div>
  );
}
