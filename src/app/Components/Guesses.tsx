import InputContainer from "./Input"
import HintBox from "./HintBox"; // Assuming you'll create this component later


//// Interfaces for Guesses Components
interface GuessContainerProps {
  allCharacterData: Map<string, string[]>,
  history: string[],
  onGuess: (guess: string) => void,
  todaysAnswer: string,
  //onReset: (newAnswer?: string, newShowModal?: boolean) => void;
}

interface GuessBoxProps {
  allCharacterData: Map<string, string[]>,
  history: string[],
  onGuess: (guess: string) => void,
  //resetFunc: (newAnswer?: string, newShowModal?: boolean) => void;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Begin component declaration

export default function GuessContainer({ allCharacterData, history, onGuess, todaysAnswer }: GuessContainerProps) {
  console.log("Today's Answer is:", todaysAnswer);

  return (
    <div className="guess-container flex flex-col items-center justify-center w-full space-y-4">
      <HintBox allCharacterData={allCharacterData} todaysAnswer={todaysAnswer} numGuesses={history.length + 1} /> {/* New HintBox centered above */}
      <GuessBox
        allCharacterData={allCharacterData}
        history={history}
        onGuess={onGuess}
      />
    </div>
  );
}

function GuessBox({ allCharacterData, history, onGuess }: GuessBoxProps) {
  return (
    <div className="guessbox relative flex justify-center items-center w-2/3">
      <InputContainer allCharacterData={allCharacterData} history={history} onGuess={onGuess} />
      <div className="absolute top-0 right-0">
        {/* Anything you want in top-right corner */}
      </div>
    </div>
  );
}