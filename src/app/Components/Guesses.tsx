import InputContainer from "./Input"

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
export default function GuessContainer({ allCharacterData, history, onGuess, todaysAnswer}: GuessContainerProps) {

  console.log("Today's Answer is:", todaysAnswer)
  return (
    <div className="guess-container flex flex-col items-center justify-center w-full">
      <GuessBox
        allCharacterData={allCharacterData}
        history={history}
        onGuess={onGuess}
      >
      </GuessBox>
    </div>
  )
}

function GuessBox({ allCharacterData, history, onGuess}: GuessBoxProps) {
  //
  return (
    <div className="guessbox relative flex justify-center w-2/3 my-4">
      <InputContainer allCharacterData={allCharacterData} history={history} onGuess={onGuess} />
      <div className="absolute top-0 right-0">
      </div>
    </div>
  );
}
