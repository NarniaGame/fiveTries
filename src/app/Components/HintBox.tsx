import React from 'react';

interface HintBoxProps {
  allCharacterData: Map<string, string[]>;
  todaysAnswer: string;
  numGuesses: number;
}

export default function HintBox({ allCharacterData, todaysAnswer, numGuesses }: HintBoxProps) {
  const hints = allCharacterData.get(todaysAnswer) || [];

  return (
    <div className="flex flex-col items-center justify-start bg-[rgb(101,67,33)] text-white rounded-lg p-4"
         style={{
           height: '40vh',
           width: '20vw',
           marginTop: '2vh',
           marginBottom: '2vh',
         }}
    >
      <div className="flex flex-col space-y-2 w-full">
        {hints.slice(0, numGuesses).map((hint, index) => (
          <div key={index} className="text-lg text-center break-words">
            {hint}
          </div>
        ))}
      </div>
    </div>
  );
}