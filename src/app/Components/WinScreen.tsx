interface WinScreenProps {
  todaysAnswer: string, 
  history: string[], 
  onFreePlay: (newAnswer?: string, newShowModal?: boolean) => void,
  daily: boolean,
  characterData: Map<string, string[]>,
}

export default function WinScreen({todaysAnswer, history, onFreePlay, daily, characterData}: WinScreenProps) {
  // Helper function to generate a new character 
  const handleResetClick = () => {

        const keys = Array.from(characterData.keys());
        const randomIndex = Math.floor(Math.random() * keys.length);
        const newAnswer: string = keys[randomIndex];   
      

        
            
        onFreePlay(newAnswer, false);
    };

    return (
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md mb-6 text-center">
        <div className="text-lg text-gray-700 mb-2">
          {daily ? "Today's answer was:" : "The answer was:"}
        </div>
        <div className="text-2xl font-semibold text-black mb-4">
          {todaysAnswer}
        </div>
        <div className="text-sm text-gray-600 mb-6">
          Number of tries: {history.length}
        </div>
        <button
          onClick={handleResetClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
        >
          Play Again (Free Play)
        </button>
      </div>
    );
  }
  