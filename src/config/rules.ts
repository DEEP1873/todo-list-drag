import piecetyp, { PieceColor, type Piecety } from "./chesspieces";
import { getMoves,getPawnMoves } from "./moves";
 

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

 export const checkCheckmate = (
    board: (Piecety | null)[][],
    color: PieceColor
  ): boolean => {
    if (!isInCheck(board, color)) return false;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece?.color === color) {
          const moves = getMoves(r, c, board);
          const moveswithpawn = getPawnMoves(r, c, board);

          for (const [mr, mc] of moves) {
            const newBoard = board.map((row) => row.slice());
            newBoard[mr][mc] = piece;
            newBoard[r][c] = null;
            if (!isInCheck(newBoard, color)) {
              return false;
            }
          }
          for (const [mr, mc] of moveswithpawn) {
            const newBoard = board.map((row) => row.slice());
            newBoard[mr][mc] = piece;
            newBoard[r][c] = null;
            if (!isInCheck(newBoard, color)) {
              return false;
            }
          }
        }
      }
    }
    alert("Checkmate!");
    return true;
  };