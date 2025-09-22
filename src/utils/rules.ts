import piecetyp, { PieceColor, type Piecety } from "../utils/chesspieces";
import { getMoves, getPawnMoves } from "../utils/moves";

const colval2 = 8;

export const findKingPosition = (
  board: (Piecety | null)[][],
  color: PieceColor
): [number, number] | null => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece?.type === piecetyp.KING && piece?.color === color) {
        return [r, c];
      }
    }
  }
  return null;
};

export const isInCheck = (
  board: (Piecety | null)[][],
  color: PieceColor
): boolean => {
  const kingPos = findKingPosition(board, color);
  if (!kingPos) return false;

  const [kingRow, kingCol] = kingPos;
  const opponentColor =
    color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

  for (let r = 0; r < colval2; r++) {
    for (let c = 0; c < colval2; c++) {
      const piece = board[r][c];
      if (!piece || piece?.color !== opponentColor) continue;

      let moves: [number, number][] = [];

      if (piece?.type === piecetyp.PAWN) {
        moves = getPawnMoves(r, c, board);
      } else {
        moves = getMoves(r, c, board);
      }
      if (moves.some(([mr, mc]) => mr === kingRow && mc === kingCol)) {
        return true;
      }
    }
  }

  return false;
};

export const isCheckmate = (
  board: (Piecety | null)[][],
  color: PieceColor
): { checkmate: boolean; winner: PieceColor | null } => {
  // Quick reject: if king isn't in check, can't be checkmate
  if (!isInCheck(board, color)) {
    return { checkmate: false, winner: null };
  }

  // local deep clone helper (safe, self-contained)
  const deepCloneBoard = (b: (Piecety | null)[][]): (Piecety | null)[][] =>
    b.map((row) => row.map((cell) => (cell ? { ...cell } : null)));

  // iterate every piece of `color`
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      const piece = board[r][c];
      if (!piece || piece.color !== color) continue;

      // get raw possible moves (not filtered by legality)
      const possibleMoves: [number, number][] =
        piece.type === piecetyp.PAWN
          ? getPawnMoves(r, c, board)
          : getMoves(r, c, board);

      // try each possible move (including promotions)
      for (const [mr, mc] of possibleMoves) {
        const newBoard = deepCloneBoard(board);

        // move piece (copy the piece object)
        newBoard[mr][mc] = { ...piece };
        newBoard[r][c] = null;

        // If pawn reaches last rank -> try all promotion types
        if (piece.type === piecetyp.PAWN && (mr === 0 || mr === 7)) {
          const promotions = [
            piecetyp.QUEEN,
            piecetyp.ELEPHANT,
            piecetyp.CAMMEL,
            piecetyp.HORSE,
          ];
          for (const promoType of promotions) {
            newBoard[mr][mc] = { ...piece, type: promoType };
            if (!isInCheck(newBoard, color)) {
              // found a move (via promotion) that escapes check
              return { checkmate: false, winner: null };
            }
          }
        } else {
          // normal move: if move results in no check -> not checkmate
          if (!isInCheck(newBoard, color)) {
            return { checkmate: false, winner: null };
          }
        }
      }
    }
  }

  // no legal move found that escapes check => checkmate
  return {
    checkmate: true,
    winner: color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE,
  };
};
