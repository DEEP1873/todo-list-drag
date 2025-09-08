import piecetyp, { PieceColor, type Piecety } from "./chesspieces";
import { isInCheck } from "./rules";

export type Move = {
  id: number;
  from: string;
  to: string;
  symbol: string;
};
type Direction = [number, number];
const colval2 = 8;
const pieceDirections: Record<
  piecetyp,
  { dirs: Direction[]; maxSteps: number }
> = {
  [piecetyp.PAWN]: {
    dirs: [],
    maxSteps: 1,
  },
  [piecetyp.ELEPHANT]: {
    dirs: [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ],
    maxSteps: 8,
  },
  [piecetyp.HORSE]: {
    dirs: [
      [-2, -1],
      [-2, 1],
      [2, -1],
      [2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
    ],
    maxSteps: 1,
  },
  [piecetyp.CAMMEL]: {
    dirs: [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ],
    maxSteps: 8,
  },

  [piecetyp.QUEEN]: {
    dirs: [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ],
    maxSteps: 8,
  },
  [piecetyp.KING]: {
    dirs: [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ],
    maxSteps: 1,
  },
};

export const getPawnMoves = (
  row: number,
  col: number,
  board: (Piecety | null)[][]
): [number, number][] => {
  const piece = board[row][col];
  const moves: [number, number][] = [];

  //white board
  if (piece?.color === PieceColor.WHITE) {
    //forward moves
    if (row > 0 && board[row - 1][col] === null) {
      moves.push([row - 1, col]);
      if (row === 6 && board[row - 2][col] === null) {
        moves.push([row - 2, col]);
      }
    }

    //diagonal moves

    if (
      row > 0 &&
      col >= 0 &&
      board[row - 1][col - 1] &&
      board[row - 1][col - 1]?.color !== PieceColor.WHITE
    ) {
      moves.push([row - 1, col - 1]);
    }

    if (
      row > 0 &&
      col <= colval2 &&
      board[row - 1][col + 1] &&
      board[row - 1][col + 1]?.color !== PieceColor.WHITE
    ) {
      moves.push([row - 1, col + 1]);
    }
  }

  //black
  if (piece?.color === PieceColor.BLACK) {
    if (row < 7 && board[row + 1][col] === null) {
      moves.push([row + 1, col]);
      if (row === 1 && board[row + 2][col] === null) {
        moves.push([row + 2, col]);
      }
    }

    if (
      row < 7 &&
      col < 7 &&
      board[row + 1][col + 1] &&
      board[row + 1][col + 1]?.color !== PieceColor.BLACK
    ) {
      moves.push([row + 1, col + 1]);
    }

    if (
      row < 7 &&
      col > 0 &&
      board[row + 1][col - 1] &&
      board[row + 1][col - 1]?.color !== PieceColor.BLACK
    ) {
      moves.push([row + 1, col - 1]);
    }
  }

  return moves;
};

export const getMoves = (
  row: number,
  col: number,
  board: (Piecety | null)[][]
): [number, number][] => {
  const piece = board[row][col];
  if (!piece) return [];

  const moves: [number, number][] = [];

  const config = pieceDirections[piece.type];

  for (const [dr, dc] of config.dirs) {
    let steps = 1;
    let updatedrow = row + dr,
      updatedcol = col + dc;

    while (
      updatedrow >= 0 &&
      updatedrow < colval2 &&
      updatedcol >= 0 &&
      updatedcol < colval2 &&
      steps <= config.maxSteps
    ) {
      const target = board[updatedrow][updatedcol];
      if (!target) {
        moves.push([updatedrow, updatedcol]);
      } else if (target.color !== piece?.color) {
        moves.push([updatedrow, updatedcol]);
        break;
      } else {
        break;
      }

      updatedrow += dr;
      updatedcol += dc;
      steps++;
    }
  }
  return moves;
};

export const getLegalMoves = (
  row: number,
  col: number,
  board: (Piecety | null)[][],
  color: PieceColor
): [number, number][] => {
  const piece = board[row][col];
  if (!piece || !piece.color || piece.color !== color) return [];

  let possibleMoves: [number, number][] = [];
  if (piece.type === piecetyp.PAWN) {
    possibleMoves = getPawnMoves(row, col, board);
  } else {
    possibleMoves = getMoves(row, col, board);
  }

  const legalMoves: [number, number][] = [];

  for (const [pr, pc] of possibleMoves) {
    const newBoard = board.map((r) => [...r]);

    newBoard[pr][pc] = piece;
    newBoard[row][col] = null;

    if (!isInCheck(newBoard, piece.color)) {
      legalMoves.push([pr, pc]);
    }
  }

  return legalMoves;
};
