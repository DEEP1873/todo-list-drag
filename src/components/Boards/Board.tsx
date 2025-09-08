import React from "react";
import Square from "./Square";

  const FILES = Array.from({ length: 8 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

interface BoardProps {
  board: any[][];
  highlightedMoves: [number, number][];
  handleclick: (row: number, col: number) => void;
  whiteTurn: boolean;
  blackTurn: boolean;
  checkedKing: [number, number] | null;
  getPieceSymbol: (piece: any) => string;
  PieceColor: any;
}

const Board: React.FC<BoardProps> = ({
  board,
  highlightedMoves,
  handleclick,
  whiteTurn,
  blackTurn,
  checkedKing,
  getPieceSymbol,
  PieceColor,
}) => {
  return (
   <div className="inline-block p-2  my-1 sm:my-0 lg:my-14 flex-col sm:flex-col  lg:flex-row">
  {/* Board */}
  <div className="flex flex-col">
    {board.map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-center items-center">
        {/* Left numbers */}
        <div className="text-white font-bold p-1 lg:p-4 text-sm self-center lg:text-2xl drop-shadow-[3px_3px_3px_black]">
          {8 - rowIndex}
        </div>

        {row.map((col, colindex) => (
          <Square
            key={colindex}
            rowIndex={rowIndex}
            colindex={colindex}
            col={col}
            board={board}
            highlightedMoves={highlightedMoves}
            handleclick={handleclick}
            whiteTurn={whiteTurn}
            blackTurn={blackTurn}
            checkedKing={checkedKing}
            getPieceSymbol={getPieceSymbol}
            PieceColor={PieceColor}
          />
        ))}
      </div>
    ))}
  </div>

  {/* Bottom letters */}
  <div className="flex items-center justify-center font-bold mb-1 px-4 lg:px-14 lg:gap-3 text-white drop-shadow-[3px_3px_3px_black]  text-sm lg:text-2xl gap-1 md:gap-2">
    {FILES.map((file) => (
      <div key={file} className="w-9 lg:w-14 text-center pl-4 lg:pl-9  self-center">
        {file}
      </div>
    ))}
  </div>
</div>

  );
};

export default Board;
