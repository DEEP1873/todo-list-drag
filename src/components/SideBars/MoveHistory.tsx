      
import React from "react";

interface Move {
  id: number;
  symbol: string;
  from: string;
  to: string;
}

interface MoveHistoryProps {
  moves: Move[];
  classname?: string;
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moves,classname }) => {
  return (
    <div className={`flex flex-col p-2 lg:p-5 bg-gradient-to-r from-amber-900 to-amber-100 rounded-2xl text-black shadow-inner border border-amber-200  overflow-y-auto h-50 lg:h-140 md:w-[50%] lg:w-[100%] md:mx-auto mx-5 lg:mx-0 my-2 lg:my-1 ${classname}`}>
      <h2 className="font-extrabold mb-2  lg:mb-4 shadow-lg bg-amber-100 rounded-xl px-4 py-1 lg:px-6 lg:py-2 self-center lg:text-center  lg:text-lg text-sm sticky top-0 ">
        📜 Moves History
      </h2>
      <div className="flex flex-col gap-3">
        {moves.length === 0 ? (
          <p className="text-center italic">No moves yet...</p>
        ) : (
          moves.map((move) => (
            <div
              key={move.id}
              className="text-sm lg:text-lg p-2 lg:p-3 bg-amber-50 border border-amber-900 shadow-md rounded-xl font-semibold flex justify-between items-center hover:bg-amber-100 transition"
            >
              <span>
                {move.id}. {move.symbol}
              </span>
              <span className="text-sm">
                ➡ {move.from} → {move.to}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MoveHistory;
