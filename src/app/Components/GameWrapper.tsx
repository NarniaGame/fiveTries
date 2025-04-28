"use client"

import { useState } from "react";
import Game from "./Game";

interface GameWrapperProps {
    allCharacterData: Map<string, string[]>,
}

const DEBUGGING = false;

export default function GameWrapper({ allCharacterData }: GameWrapperProps) {
    // Set defaults for game start
    // Create an initial answer based on the defaults
    const keys = Array.from(allCharacterData.keys());
    const randomIndex = Math.floor(Math.random() * keys.length);
    const initialAnswer: string = keys[randomIndex];   

    // Initialize state based on calculated defaults
    const [todaysAnswer, setTodaysAnswer] = useState(initialAnswer);
    const [gameKey, setGameKey] = useState(0);
    const [showModal, setShowModal] = useState(true);
  
    /**
     * Reset game function that will be passed down to reinitialize the game state
     * New characters are prepared locally downstream whenever a reset button exists and they just
     * pass the info up here 
     * 
     * TODO: Refactor code so that reset game performs the character calculation so everything
     * is in one place
     * 
     * @param newAnswer Character name 
     * @param newDifficulties
     * @param newShowModal 
     * returns nothing
     */
    function resetGame(newAnswer?: string, newShowModal?: boolean) {
      setTodaysAnswer(newAnswer || initialAnswer);
      console.log("ShowModal1", newShowModal)
      setShowModal(newShowModal ?? true);
      setGameKey((prevKey) => prevKey + 1);
    }
    
    console.log("showModal2", showModal)
    return (
      <Game
        key={gameKey}
        todaysAnswer={todaysAnswer}
        allCharacterData={allCharacterData}
        onReset={resetGame} // Pass down reset function
        showModal={showModal}
      />
    );
}