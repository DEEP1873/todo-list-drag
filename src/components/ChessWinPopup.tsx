import React from "react";

interface ChessWinPopupProps {
  winner: "white" | "black" | null; 
  onRestart: () => void;
  onClose: () => void;
}

const ChessWinPopup: React.FC<ChessWinPopupProps> = ({
  winner,
  onRestart,
  onClose,
}) => {
  if (!winner) return null; 

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-amber-950 p-6 rounded-2xl shadow-lg text-center w-[90%] sm:w-[350px]">
        <h2 className="text-2xl font-bold text-white mb-4">
          🎉 {winner === "white" ? "White Wins!" : "Black Wins!"}
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={onRestart}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Restart
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChessWinPopup;
