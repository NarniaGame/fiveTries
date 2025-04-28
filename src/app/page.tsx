import { parse } from "csv-parse/sync"
import * as fs from 'fs'
import GameWrapper from "./Components/GameWrapper";


const INPUT_PATH = './data/character_data.csv'

/**
 * Performs data loading outside of rendering the game so it only happens once.
 * @returns <Game>
 */
export default function Home() {
  //// Recieve correct answer of the day from API (Might need loading bar)
  // Use parser to read in data 
  let file : null | string = null;
  file = fs.readFileSync(INPUT_PATH, 'utf8');
  const tempData : null | string[][] = parse(file, {});

  // Confirm data was read in correctly
  if (tempData === null) {
    throw new Error("Didn't read in any characters")
  }

  // Organize and store data for use later
  const allCharacterData: Map<string, string[]> = new Map<string, string[]>()
  console.log(allCharacterData)


  for (let i = 0; i < tempData.length; i++) {
    const row: string[] = tempData[i];
    allCharacterData.set(row[0], row.slice(1));
  }

  return <div className="background bg-cover bg-center flex justify-center"
              style={{
                height: "100vh",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundImage: `url(https://blenderartists.org/uploads/default/original/4X/8/b/e/8befa5dc62b5b1e4dd9fd824f66643e13ba87db6.jpeg)`
              }}> 
              <div className="game-container overflow-y-scroll w-full h-full">
                <GameWrapper 
                    allCharacterData={allCharacterData}>
                </GameWrapper>
                {/* <Game todaysAnswer={todaysAnswer} allCharacterData={allCharacterData} initialDifficulties={difficulties}></Game> */}
              </div>
          </div> 
}


