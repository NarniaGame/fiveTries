"use client"

import { useState } from "react";
import GuessContainer from "./Guesses";
import WinScreen from "./WinScreen";
import { createHash } from 'crypto';


interface GameProps {
  todaysAnswer: string;
  allCharacterData: Map<string, string[]>;
  onReset: (newAnswer?: string, newShowModal?: boolean) => void;
  showModal: boolean;
}

interface ModalProps {
  onClose: () => void;
  resetFunc: (newAnswer?: string, newShowModal?: boolean,) => void;
  setDaily: (state: boolean) => void;
  allCharacterData: Map<string, string[]>;
}

// Helper function for generating the daily character
function sha256ToBigInt(data: string): bigint {
  const hashHex = createHash('sha256').update(data).digest('hex');
  return BigInt('0x' + hashHex);
}

function Modal({ onClose, resetFunc, setDaily, allCharacterData }: ModalProps) {
  //// Generate the character for when the player starts playing - both daily and free
  // Our initial character will only be from difficulties easy, medium, and hard

  // Get all keys from allCharacterData
  const allKeys = Array.from(allCharacterData.keys());

  // Choose a random key
  const randomIndex = Math.floor(Math.random() * allKeys.length);
  const initialAnswer: string = allKeys[randomIndex];

  // Calculate the daily character using our hash
  const dateStr = new Date().toISOString().split("T")[0];
  const hashInt = sha256ToBigInt(dateStr);
  const keysSize = BigInt(allKeys.length)
  const index = hashInt % keysSize
  const dailyAnswer: string = allKeys[Number(index)]

  // Now that we have generated the characters we can create our modal
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full text-center relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-black bg-transparent p-2 text-2xl"
        >
          &times;
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold mb-4">Welcome to Inndle!</h2>

        <p className="mb-6 text-sm text-gray-700 leading-relaxed">
          The <strong>Daily Challenge</strong> is the same for everyone and resets at <strong>8:00pm EST</strong>.<br /><br />
          <strong>Free Play</strong> gives a random character each time.<br /><br />
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => { resetFunc(dailyAnswer, false); setDaily(true) }}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Daily Challenge
          </button>
          <button
            onClick={() => resetFunc(initialAnswer, false)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Free Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Game({ todaysAnswer, allCharacterData, onReset, showModal }: GameProps) {
  const [history, setHistory] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [showTheModal, setShowTheModal] = useState(showModal);
  const [isDaily, setIsDaily] = useState(false);

  // Helper function to pass down to Guesses to update history state
  function handleGuess(guess: string): void {
    const newHistory = [...history];
    newHistory.unshift(guess);
    setHistory(newHistory);
    if (guess === todaysAnswer || newHistory.length == 5) {
      setFinished(true);
    }
  }


  return (
    <div className="game flex flex-col items-center relative px-4">
      {showTheModal && (
        <Modal
          onClose={() => setShowTheModal(false)}
          resetFunc={onReset}
          setDaily={setIsDaily}
          allCharacterData={allCharacterData}
        />
      )}
  
      {!showTheModal && (
        finished ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <WinScreen
              todaysAnswer={todaysAnswer}
              history={history}
              onFreePlay={onReset}
              daily={isDaily}
              characterData={allCharacterData}
            />
          </div>
        ) : (
          <GuessContainer
            allCharacterData={allCharacterData}
            history={history}
            onGuess={handleGuess}
            todaysAnswer={todaysAnswer}
          />
        )
      )}
    </div>
  );
}