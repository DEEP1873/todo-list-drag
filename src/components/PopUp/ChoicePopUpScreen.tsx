import React, { useEffect } from "react";
import piecetyp from "../../config/chesspieces";
import type { PromotionOption } from "../../config/chesspieces";

interface ChoicePopUpScreenProps {
  onSelect: (pieceName: string, pieceSymbol: string) => void;
  timeleft?: number;
  settimeleft?:React.Dispatch<React.SetStateAction<number>>; 
}


const promotionOptions: PromotionOption[] = [
  { name: piecetyp.QUEEN, symbol: "♕" },
  { name: piecetyp.HORSE, symbol: "♘" },
  { name: piecetyp.ELEPHANT, symbol: "♖" },
  { name: piecetyp.CAMMEL, symbol: "♗" },
];

const ChoicePopUpScreen: React.FC<ChoicePopUpScreenProps> = ({
  onSelect,
  timeleft,
  settimeleft
}) => {
  useEffect(() => {
    if (timeleft !== undefined && timeleft <=5) {
      const randomOpt =
        promotionOptions[Math.floor(Math.random() * promotionOptions.length)];
      onSelect(randomOpt.name, randomOpt.symbol);
      if(settimeleft){

        settimeleft(30);
      }
      return; // exit early, don’t start timeout
    }

    return () => clearTimeout(timeleft);
  }, [onSelect, timeleft]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center ">
      <div className="bg-amber-950 p-6 rounded-xl shadow-lg flex gap-4">
        {promotionOptions.map((opt) => (
          <button
            key={opt.symbol}
            onClick={() => onSelect(opt.name, opt.symbol)}
            className="p-3 bg-white rounded-lg text-2xl transition-all duration-200 ease-in-out hover:bg-[#b58863] hover:scale-105 shadow-lg"
          >
            {opt.symbol} {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChoicePopUpScreen;
