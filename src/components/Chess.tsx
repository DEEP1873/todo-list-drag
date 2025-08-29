import React, { useState } from "react";

enum piecetyp {
  QUEEN = "Q",
  HORSE = "H",
  CAMMEL = "C",
  ELEPHANT = "E",
  PAWN = "P",
  KING = "k",
}

enum PieceColor {
  WHITE = "white",
  BLACK = "black",
}

interface Piecety {
  type: piecetyp;
  color: PieceColor;
}

const getPieceSymbol = (piece: Piecety | null): string => {
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

const initialBoard: (Piecety | null)[][] = [
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

type Move = {
  id: number;
  from: string;
  to: string;
  symbol: string;
};
type Direction = [number, number];

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
  [piecetyp.KING]: { dirs: [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]], maxSteps: 1 },
};

const Chess: React.FC = () => {
  const [board, setBoard] = useState(initialBoard);
  const [select, setSelect] = useState<[number, number] | null>(null);

  const [moves, setMoves] = useState<Move[]>([]);
  const [blackTurn, setBlackTurn] = useState(false);
  const [whiteTurn, setWhiteTurn] = useState<boolean>(true);
  const [highlightedMoves, setHighlightedMoves] = useState<[number, number][]>(
    []
  );
  const [winner, setWinner] = useState<boolean>(false);
  const FILES = Array.from({ length: 8 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  
  const colval2 = 8;

  const getPawnMoves = (
    row: number,
    col: number,
    board: ( Piecety | null)[][]
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
      if (row < colval2 && board[row + 1][col] === null) {
        moves.push([row + 1, col]);
        if (row === 1 && board[row + 2][col] === null) {
          moves.push([row + 2, col]);
        }
      }

      if (
        row < colval2 &&
        col < colval2 &&
        board[row + 1][col + 1] &&
        board[row + 1][col + 1]?.color !== PieceColor.BLACK
      ) {
        moves.push([row + 1, col + 1]);
      }

      if (
        row < colval2 &&
        col > 0 &&
        board[row + 1][col - 1] &&
        board[row + 1][col - 1]?.color !== PieceColor.BLACK
      ) {
        moves.push([row + 1, col - 1]);
      }
    }

    return moves;
  };

  const getMoves = (
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
      let updatedrow = row + dr, updatedcol = col + dc;

      if (piece.type === piecetyp.PAWN) {
        // forward
        const dir = piece.color===PieceColor.WHITE ? -1 : 1;
        const startRow = piece.color===PieceColor.WHITE  ? 6 : 1;

        if (board[row + dir][col] === null) {
          moves.push([row + dir, col]);
  
          // double step
          if (row === startRow && board[row + 2 * dir][col]  === null) {
            moves.push([row + 2 * dir, col]);
          }

        }

        // captures
        for (let dc of [-1, 1]) {
          const r = row + dir,
            c = col + dc;
          if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const target = board[r][c];
            if (target && target.color !== piece.color) {
              moves.push([r, c]);
            }
          }
        }

        return moves;
      }

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

  const getSquare = (row: number, col: number): string => {
    return `${FILES[col]}${colval2 - row}`;
  };

  const onRestart = () => {
    setBoard(initialBoard);
    setSelect(null);
    setHighlightedMoves([]);
    setMoves([]);
    setWinner(false);

    setBlackTurn(!blackTurn);
    setWhiteTurn(!whiteTurn);
    return;
  };

  const handleclick = (row: number, col: number) => {
    if (select) {
      const [selRow, selCol] = select;
      const piece = board[selRow][selCol];
      // const isWhite =  PieceColor.WHITE;
      const target = board[row][col];
      const symbol = getPieceSymbol(piece);

      const fromSquare = getSquare(selRow, selCol);
      const toSquare = getSquare(row, col);

      const addMove = (from: string, to: string, symbol: string) => {
        setMoves((prev) => [
          ...prev,
          { id: prev.length + 1, from, to, symbol },
        ]);
      };
      addMove(fromSquare, toSquare, symbol);

      let validMoves: [number, number][] = [];

      if (target && target.type === piecetyp.KING && target.color !== piece?.color ) {
        const newboard = board.map((prev) => [...prev]);
        newboard[row][col] = piece;
        newboard[selRow][selCol] = null;

        setBoard(newboard);
        setSelect(null);
        setWinner(true);
        setHighlightedMoves([]);
        return;
      }

      if (piece && piece.type === piecetyp.PAWN) {
        validMoves = getPawnMoves(selRow, selCol, board);
      }

      if (piece && piece.type === piecetyp.ELEPHANT) {
        validMoves = getMoves(selRow, selCol, board);
      }
      if (piece && piece.type === piecetyp.HORSE) {
        validMoves = getMoves(selRow, selCol, board);
      }
      if (piece && piece.type === piecetyp.CAMMEL) {
        validMoves = getMoves(selRow, selCol, board);
      }

      if (piece && piece.type === piecetyp.QUEEN) {
        validMoves = getMoves(selRow, selCol, board);
      }

      if (piece && piece.type === piecetyp.KING) {
        validMoves = getMoves(selRow, selCol, board);
      }
      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);

      if (isValidMove) {
        const newboard = board.map((prev) => [...prev]);
        newboard[row][col] = piece;

        newboard[selRow][selCol] = null;

        setBoard(newboard);
        setSelect(null);
        setHighlightedMoves([]);

        setBlackTurn(!blackTurn);
        setWhiteTurn(!whiteTurn);
      } else {
        setSelect(null);
        setHighlightedMoves([]);
      }
    } else {
      const currentpiece = board[row][col];
      if (currentpiece !== null && !winner) {
        const isWhitePiece = currentpiece.color === PieceColor.WHITE;
        const isBlackPiece = currentpiece.color === PieceColor.BLACK;

        if ((whiteTurn && isWhitePiece) || (blackTurn && isBlackPiece)) {
          setSelect([row, col]);
        } else {
          return;
        }

        let moves: [number, number][] = [];
        if (currentpiece.type === piecetyp.PAWN)
          moves = getPawnMoves(row, col, board);
        if (currentpiece.type === piecetyp.ELEPHANT)
          moves = getMoves(row, col, board);
        if (currentpiece.type === piecetyp.HORSE)
          moves = getMoves(row, col, board);
        if (currentpiece.type === piecetyp.CAMMEL)
          moves = getMoves(row, col, board);
        if (currentpiece.type === piecetyp.QUEEN)
          moves = getMoves(row, col, board);
        if (currentpiece.type === piecetyp.KING)
          moves = getMoves(row, col, board);

        setHighlightedMoves(moves);
      }
    }
  };

  return (
    <div className="flex flex-row gap-5  ">
      <div className="inline-block p-2 bg-[#3b1e0a] border-4 border-[#3b1e0a] m-auto my-10 ">
        {/* Top letters */}
        <div className="flex justify-center text-white font-bold mb-1 px-6">
          {FILES.map((file) => (
            <div key={file} className="w-14 text-center">
              {file}
            </div>
          ))}
        </div>

        {/* Board */}
        <div className="flex flex-col ">
          {/* leftpart */}
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex ">
              <div className="text-white font-bold p-4">{8 - rowIndex}</div>

              {row.map((col, colindex) => {
                const isDark = (rowIndex + colindex) % 2 === 1;
                const isHighlighted = highlightedMoves.some(
                  ([r, c]) => r === rowIndex && c === colindex
                );

                const piece = board[rowIndex][colindex];
                const isWhitePiece =
                  piece?.color === PieceColor.WHITE && piece !== null;
                const isBlackPiece =
                  piece?.color === PieceColor.BLACK && piece !== null;
                const isClickable =
                  (whiteTurn && isWhitePiece) ||
                  (blackTurn && isBlackPiece) ||
                  piece === null;

                return (
                  <div
                    key={colindex}
                    onClick={() => handleclick(rowIndex, colindex)}
                    className={`flex items-center text-3xl h-14 w-14 justify-center  ${
                      isDark ? "bg-[#b58863]" : "bg-[#f0d9b5]"
                    }
                    ${
                      isHighlighted && col
                        ? "border-4 border-red-600 cursor-pointer"
                        : ""
                    }
                     ${!isClickable ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span>{getPieceSymbol(col)}</span>

                    {isHighlighted && !col && (
                      <div className="absolute w-3 h-3 bg-black rounded-full opacity-80"></div>
                    )}
                  </div>
                );
              })}

              <div className="text-white font-bold p-4">{8 - rowIndex}</div>
            </div>
          ))}
        </div>

        {/* Bottom letters */}

        <div className="flex justify-center text-white font-bold mb-1 px-6">
          {FILES.map((file) => (
            <div key={file} className="w-14 text-center">
              {file}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-2 w-[37%]  bg-amber-950 rounded-2xl m-auto">
        <div className="flex  p-5 border-2 justify-center m-5 bg-[#f0d9b5] text-black text-2xl ">
          {whiteTurn ? (
            winner ? (
              <div className="text-black font-bold">
                🎉 White Wins 🎉
                <button
                  onClick={onRestart}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Restart
                </button>
              </div>
            ) : (
              <div>White's Turn</div>
            )
          ) : winner ? (
            <div>
              🎉 Black Wins {""} 🎉
              <button
                onClick={onRestart}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Restart
              </button>{" "}
            </div>
          ) : (
            <div>Black's Turn</div>
          )}
        </div>

        <div className="flex flex-col border-1 p-5 bg-[#f0d9b5] rounded-2xl text-black  overflow-y-auto  ">
          <h2 className="font-bold mb-2 border-2 rounded-2xl p-2 self-center">
            Moves History
          </h2>
          <div className="flex flex-col gap-1 h-80 max-h-80 ">
            {moves.map((move) => (
              <div
                key={move.id}
                className="text-xl p-2 border-2 rounded-2xl font-semibold m-2"
              >
                {move.id}. {move.symbol} ---{">"} {move.from} - {move.to}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chess;
