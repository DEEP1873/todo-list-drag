import React from "react";
import Confetti from "react-confetti";
import MoveHistory from "./MoveHistory";
import Timer from "./Timer";
import ChoicePopUpScreen from "../PopUp/ChoicePopUpScreen";

interface SidebarProps {
  whiteTurn: boolean;
  winner: string | boolean;
  onRestart: () => void;
  timeLeft: number;
  moves: { id: number; symbol: string; from: string; to: string }[];
  showChoicePopup: boolean;
  handlePromotion: (pieceName: string, pieceSymbol: string) => void;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  classname?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  whiteTurn,
  winner,
  onRestart,
  timeLeft,
  moves,
  showChoicePopup,
  handlePromotion,
  setTimeLeft,
  classname,
}) => {
  return (
    <div className={`flex flex-col gap-1 max-h-80 md:max-h-201 md:gap-4 md:w-[37%] lg:h-full  rounded-2xl mx-auto ${classname}`}> 
      {/* Top Section (Winner / Turn Info) */}
      <div className="flex p-2 mt-2 lg:mt-2 lg:p-5 rounded-2xl justify-center bg-gradient-to-r from-amber-900 to-amber-100 text-black md:text-2xl shadow-xl border border-amber-200">
        {winner ? (
          <div className="text-black font-bold flex flex-col items-center gap-3">
            <Confetti />
            <p className="text-3xl">
              🎉 {winner === "white" ? "White Wins" : "Black Wins"} 🎉
            </p>
            <button
              onClick={onRestart}
              className="px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-700 transition shadow-md"
            >
              Restart
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-row justify-between w-full items-center ">
              <div className="mx-auto text-black font-bold tracking-wide text-sm lg:text-2xl ">
                {whiteTurn ? "♔ White's Turn" : "♚ Black's Turn"}
              </div>
              <Timer timeLeft={timeLeft} />
            </div>
          </div>
        )}
      </div>

      {/* Moves History Section */}
      <MoveHistory moves={moves} classname="hidden lg:block"/>
       

      {/* Promotion Popup */}
      <div className="relative">
        {showChoicePopup && (
          <ChoicePopUpScreen
            onSelect={handlePromotion}
            timeleft={timeLeft}
            settimeleft={setTimeLeft}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
