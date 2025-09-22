import piecetyp, { PieceColor, type Piecety } from "./chesspieces";


export const getPieceSymbol = (piece: Piecety | null): string => {
  if (!piece) return "";

  const symbols: Record<string, string> = {
    [`${piecetyp.KING}-${PieceColor.WHITE}`]: "♔",
    [`${piecetyp.QUEEN}-${PieceColor.WHITE}`]: "♕",
    [`${piecetyp.ELEPHANT}-${PieceColor.WHITE}`]: "♖",
    [`${piecetyp.CAMMEL}-${PieceColor.WHITE}`]: "♗",
    [`${piecetyp.HORSE}-${PieceColor.WHITE}`]: "♘",
    [`${piecetyp.PAWN}-${PieceColor.WHITE}`]: "♙",
    [`${piecetyp.KING}-${PieceColor.BLACK}`]: "♚",
    [`${piecetyp.QUEEN}-${PieceColor.BLACK}`]: "♛",
    [`${piecetyp.ELEPHANT}-${PieceColor.BLACK}`]: "♜",
    [`${piecetyp.CAMMEL}-${PieceColor.BLACK}`]: "♝",
    [`${piecetyp.HORSE}-${PieceColor.BLACK}`]: "♞",
    [`${piecetyp.PAWN}-${PieceColor.BLACK}`]: "♟︎",
  };

  return symbols[`${piece.type}-${piece.color}`] || "";
};

const createPiece = (type: piecetyp, color: PieceColor): Piecety => ({
  type,
  color,
});

export const initialBoard: (Piecety | null)[][] = [
  [
    createPiece(piecetyp.ELEPHANT, PieceColor.BLACK),
    createPiece(piecetyp.HORSE, PieceColor.BLACK),
    createPiece(piecetyp.CAMMEL, PieceColor.BLACK),
    createPiece(piecetyp.KING, PieceColor.BLACK),
    createPiece(piecetyp.QUEEN, PieceColor.BLACK),
    createPiece(piecetyp.CAMMEL, PieceColor.BLACK),
    createPiece(piecetyp.HORSE, PieceColor.BLACK),
    createPiece(piecetyp.ELEPHANT, PieceColor.BLACK),
  ],
  [
    createPiece(piecetyp.PAWN, PieceColor.BLACK),
    createPiece(piecetyp.PAWN, PieceColor.BLACK),
    createPiece(piecetyp.PAWN, PieceColor.BLACK),
    createPiece(piecetyp.PAWN, PieceColor.BLACK),
    createPiece(piecetyp.PAWN, PieceColor.BLACK),
    createPiece(piecetyp.PAWN, PieceColor.BLACK),
    createPiece(piecetyp.PAWN, PieceColor.BLACK),
    createPiece(piecetyp.PAWN, PieceColor.BLACK),
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    createPiece(piecetyp.PAWN, PieceColor.WHITE),
    createPiece(piecetyp.PAWN, PieceColor.WHITE),
    createPiece(piecetyp.PAWN, PieceColor.WHITE),
    createPiece(piecetyp.PAWN, PieceColor.WHITE),
    createPiece(piecetyp.PAWN, PieceColor.WHITE),
    createPiece(piecetyp.PAWN, PieceColor.WHITE),
    createPiece(piecetyp.PAWN, PieceColor.WHITE),
    createPiece(piecetyp.PAWN, PieceColor.WHITE),
  ],
  [
    createPiece(piecetyp.ELEPHANT, PieceColor.WHITE),
    createPiece(piecetyp.HORSE, PieceColor.WHITE),
    createPiece(piecetyp.CAMMEL, PieceColor.WHITE),
    createPiece(piecetyp.QUEEN, PieceColor.WHITE),
    createPiece(piecetyp.KING, PieceColor.WHITE),
    createPiece(piecetyp.CAMMEL, PieceColor.WHITE),
    createPiece(piecetyp.HORSE, PieceColor.WHITE),
    createPiece(piecetyp.ELEPHANT, PieceColor.WHITE),
  ],
];