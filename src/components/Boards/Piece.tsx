import React from "react";

interface PieceProps {
  piece: any;
  getPieceSymbol: (piece: any) => string;
}

const Piece: React.FC<PieceProps> = ({ piece, getPieceSymbol }) => {
  return <span>{getPieceSymbol(piece)}</span>;
};

export default Piece;
