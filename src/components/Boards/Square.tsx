import React from "react";
import Piece from "./Piece";

interface SquareProps {
  rowIndex: number;
  colindex: number;
  col: any;
  board: any[][];
  highlightedMoves: [number, number][];
  handleclick: (row: number, col: number) => void;
  whiteTurn: boolean;
  blackTurn: boolean;
  checkedKing: [number, number] | null;
  getPieceSymbol: (piece: any) => string;
  PieceColor: any;
}

const Square: React.FC<SquareProps> = ({
  rowIndex,
  colindex,
  col,
  board,
  highlightedMoves,
  handleclick,
  whiteTurn,
  blackTurn,
  checkedKing,
  getPieceSymbol,
  PieceColor,
}) => {
  const isDark = (rowIndex + colindex) % 2 === 1;
  const isHighlighted = highlightedMoves.some(
    ([r, c]) => r === rowIndex && c === colindex
  );

  const piece = board[rowIndex][colindex];
  const isWhitePiece = piece?.color === PieceColor.WHITE && piece !== null;
  const isBlackPiece = piece?.color === PieceColor.BLACK && piece !== null;
  const isClickable =
    (whiteTurn && isWhitePiece) ||
    (blackTurn && isBlackPiece) ||
    piece === null;

  return (
    <div
      onClick={() => handleclick(rowIndex, colindex)}
      className={`flex items-center text-sm lg:text-3xl 
        h-10 w-10 md:h-11 md:w-11 lg:h-17 lg:w-17
        justify-center shadow-2xl ${
          isDark ? "bg-[#b58863]" : "bg-[#f0d9b5]"
        }
        ${
          isHighlighted && col
            ? "border-2 sm:border-4 border-red-600 cursor-pointer"
            : ""
        }
        ${!isClickable ? "cursor-not-allowed" : "cursor-pointer"}
        ${
          checkedKing &&
          checkedKing[0] === rowIndex &&
          checkedKing[1] === colindex
            ? "animate-pulse bg-red-500"
            : ""
        }`}
    >
      <Piece piece={col} getPieceSymbol={getPieceSymbol} />

      {isHighlighted && !col && (
        <div className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full opacity-80"></div>
      )}
    </div>
  );
};

export default Square;
