import React, { useState } from "react";

enum piecetype {
  KING = "k",
  QUEEN = "Q",
  HORSE = "H",
  CAMMEL = "C",
  PAWN = "P",
  ELEPHANT = "E",
}

enum PieceColor {
  WHITE = "white",
  BLACK = "black",
}
interface Piece {
  type: piecetype;
  color: PieceColor;
}

const getPieceSymbol = (piece: Piece | null): string => {
  if (!piece) return "";

  const symbols: Record<string, string> = {
    [`${piecetype.KING}-${PieceColor.WHITE}`]: "♔",
    [`${piecetype.QUEEN}-${PieceColor.WHITE}`]: "♕",
    [`${piecetype.ELEPHANT}-${PieceColor.WHITE}`]: "♖",
    [`${piecetype.CAMMEL}-${PieceColor.WHITE}`]: "♗",
    [`${piecetype.HORSE}-${PieceColor.WHITE}`]: "♘",
    [`${piecetype.PAWN}-${PieceColor.WHITE}`]: "♙",
    [`${piecetype.KING}-${PieceColor.BLACK}`]: "♚",
    [`${piecetype.QUEEN}-${PieceColor.BLACK}`]: "♛",
    [`${piecetype.ELEPHANT}-${PieceColor.BLACK}`]: "♜",
    [`${piecetype.CAMMEL}-${PieceColor.BLACK}`]: "♝",
    [`${piecetype.HORSE}-${PieceColor.BLACK}`]: "♞",
    [`${piecetype.PAWN}-${PieceColor.BLACK}`]: "♟︎",
  };

  return symbols[`${piece.type}-${piece.color}`] || "";
};

const createPiece = (type: piecetype, color: PieceColor): Piece => ({
  type,
  color,
});

const initialBoard: (Piece | null)[][] = [
  [
    createPiece(piecetype.ELEPHANT, PieceColor.BLACK),
    createPiece(piecetype.HORSE, PieceColor.BLACK),
    createPiece(piecetype.CAMMEL, PieceColor.BLACK),
    createPiece(piecetype.KING, PieceColor.BLACK),
    createPiece(piecetype.QUEEN, PieceColor.BLACK),
    createPiece(piecetype.CAMMEL, PieceColor.BLACK),
    createPiece(piecetype.HORSE, PieceColor.BLACK),
    createPiece(piecetype.ELEPHANT, PieceColor.BLACK),
  ],
  [
    createPiece(piecetype.PAWN, PieceColor.BLACK),
    createPiece(piecetype.PAWN, PieceColor.BLACK),
    createPiece(piecetype.PAWN, PieceColor.BLACK),
    createPiece(piecetype.PAWN, PieceColor.BLACK),
    createPiece(piecetype.PAWN, PieceColor.BLACK),
    createPiece(piecetype.PAWN, PieceColor.BLACK),
    createPiece(piecetype.PAWN, PieceColor.BLACK),
    createPiece(piecetype.PAWN, PieceColor.BLACK),
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    createPiece(piecetype.PAWN, PieceColor.WHITE),
    createPiece(piecetype.PAWN, PieceColor.WHITE),
    createPiece(piecetype.PAWN, PieceColor.WHITE),
    createPiece(piecetype.PAWN, PieceColor.WHITE),
    createPiece(piecetype.PAWN, PieceColor.WHITE),
    createPiece(piecetype.PAWN, PieceColor.WHITE),
    createPiece(piecetype.PAWN, PieceColor.WHITE),
    createPiece(piecetype.PAWN, PieceColor.WHITE),
  ],
  [
    createPiece(piecetype.ELEPHANT, PieceColor.WHITE),
    createPiece(piecetype.HORSE, PieceColor.WHITE),
    createPiece(piecetype.CAMMEL, PieceColor.WHITE),
    createPiece(piecetype.QUEEN, PieceColor.WHITE),
    createPiece(piecetype.KING, PieceColor.WHITE),
    createPiece(piecetype.CAMMEL, PieceColor.WHITE),
    createPiece(piecetype.HORSE, PieceColor.WHITE),
    createPiece(piecetype.ELEPHANT, PieceColor.WHITE),
  ],
];

type Move = {
  id: number;
  from: string;
  to: string;
  symbol: string;
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

  const colval = 7;
  const colval2 = 8;

  const getPawnMoves = (
    row: number,
    col: number,
    board: (Piece | null)[][]
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
        col <= colval &&
        board[row - 1][col + 1] &&
        board[row - 1][col + 1]?.color !== PieceColor.WHITE
      ) {
        moves.push([row - 1, col + 1]);
      }

      
    }

    //black
    if (piece?.color === PieceColor.BLACK) {
      if (row < colval && board[row + 1][col] === null) {
        moves.push([row + 1, col]);
        if (row === 1 && board[row + 2][col] === null) {
          moves.push([row + 2, col]);
        }
      }

      if (
        row < colval &&
        col < colval &&
        board[row + 1][col + 1] &&
        board[row + 1][col + 1]?.color !== PieceColor.BLACK
      ) {
        moves.push([row + 1, col + 1]);
      }

      if (
        row < colval &&
        col > 0 &&
        board[row + 1][col - 1] &&
        board[row + 1][col - 1]?.color !== PieceColor.BLACK
      ) {
        moves.push([row + 1, col - 1]);
      }
    }

    return moves;
  };

  const getElepMoves = (
    row: number,
    col: number,
    board: (Piece | null)[][]
  ): [number, number][] => {
    const piece = board[row][col];
    const isWhite = piece?.color === PieceColor.WHITE;
    const moves: [number, number][] = [];

    const exploreDirection = (dr: number, dc: number) => {
      let r = row + dr;
      let c = col + dc;

      while (r >= 0 && r < colval2 && c >= 0 && c < colval2) {
        const target = board[r][c];

        if (target === null) {
          // Empty → can move
          moves.push([r, c]);
        } else if ((target.color === PieceColor.WHITE) === isWhite) {
          // Same color → block, stop here
          break;
        } else {
          // Opponent → can capture, then stop
          moves.push([r, c]);
          break;
        }

        r += dr;
        c += dc;
      }
    
    };

    // rook goes 4 directions
    exploreDirection(-1, 0); // up
    exploreDirection(1, 0); // down
    exploreDirection(0, -1); // left
    exploreDirection(0, 1); // right

    return moves;
  };

  const getHorseMoves = (
    row: number,
    col: number,
    board: (Piece | null)[][]
  ): [number, number][] => {
    const piece = board[row][col];
    const isWhite = piece?.color === PieceColor.WHITE;
    const moves: [number, number][] = [];

    const exploreDirection = (dr: number, dc: number) => {
      const r = row + dr;
      const c = col + dc;
      

      if (r >= 0 && r < colval2 && c >= 0 && c < colval2) {
        const target = board[r][c];

        if (target === null) {
          // Empty square  valid
          moves.push([r, c]);
        } else if ((target.color === PieceColor.WHITE) !== isWhite) {
          moves.push([r, c]);
          // Opponent piece capture allowed
        }
      }
    };


    exploreDirection(-2,-1);
    exploreDirection(-2,1);
    exploreDirection(2,-1);
    exploreDirection(2,1);
    exploreDirection(-1,-2);
    exploreDirection(-1,2);
    exploreDirection(1,-2);
    exploreDirection(1,2);

    return moves;
  };

  const getCamelMoves = (
    row: number,
    col: number,
    board: (Piece | null)[][]
  ): [number, number][] => {
    const piece = board[row][col];
    const isWhite = piece?.color === PieceColor.WHITE;
    const moves: [number, number][] = [];

    const exploreDirection = (dr: number, dc: number) => {
      let r = row + dr;
      let c = col + dc;

      while (r >= 0 && r < colval2 && c >= 0 && c < colval2) {
        const target = board[r][c];

        if (target === null) {
          moves.push([r, c]);
        } else if ((target.color === PieceColor.WHITE) === isWhite) {
          break;
        } else {
          moves.push([r, c]);
          break;
        }

        r += dr;
        c += dc;
      }
      console.log(moves);
    };

    exploreDirection(-1, +1); // up
    exploreDirection(1, -1); // down
    exploreDirection(-1, -1); // left
    exploreDirection(1, 1); // right

    return moves;
  };

  const getQueenMoves = (
    row: number,
    col: number,
    board: (Piece | null)[][]
  ): [number, number][] => {
    console.log("enter in the queen function");

    const elephant = getElepMoves(row, col, board); // rook-like moves
    const camel = getCamelMoves(row, col, board); // bishop-like moves

    return [...elephant, ...camel];
  };

  const getKingMoves = (
    row: number,
    col: number,
    board: (Piece | null)[][]
  ): [number, number][] => {
    const piece = board[row][col];
    const isWhite = piece?.color === PieceColor.WHITE;
    const moves: [number, number][] = [];

    const exploreDirection = (dr: number, dc: number) => {
      const r = row + dr;
      const c = col + dc;

      if (r >= 0 && r < colval2 && c >= 0 && c < colval2) {
        const target = board[r][c];
        if (target === null) {
          moves.push([r, c]);
        } else if ((target.color === PieceColor.WHITE) !== isWhite) {
          // console.log("ddddd")
          moves.push([r, c]); // opponent piece → capture
        }
      }
      console.log(moves);
    };

    exploreDirection(-1, 0); // up
    exploreDirection(1, 0); // down
    exploreDirection(0, -1); // left
    exploreDirection(0, 1); // right

    exploreDirection(-1, -1); // up-left
    exploreDirection(-1, 1); // up-right
    exploreDirection(1, -1); // down-left
    exploreDirection(1, 1); // down-right

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

      if (target && target.type === piecetype.KING && target.color !== piece?.color ) {
        const newboard = board.map((prev) => [...prev]);
        newboard[row][col] = piece;
        newboard[selRow][selCol] = null;

        setBoard(newboard);
        setSelect(null);
        setWinner(true);
        setHighlightedMoves([]);
        return;
      }

      if (piece && piece.type === piecetype.PAWN) {
        validMoves = getPawnMoves(selRow, selCol, board);
      }

      if (piece && piece.type === piecetype.ELEPHANT) {
        validMoves = getElepMoves(selRow, selCol, board);
      }
      if (piece && piece.type === piecetype.HORSE) {
        validMoves = getHorseMoves(selRow, selCol, board);
      }
      if (piece && piece.type === piecetype.CAMMEL) {
        validMoves = getCamelMoves(selRow, selCol, board);
      }

      if (piece && piece.type === piecetype.QUEEN) {
        validMoves = getQueenMoves(selRow, selCol, board);
      }

      if (piece && piece.type === piecetype.KING) {
        validMoves = getKingMoves(selRow, selCol, board);
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
        if (currentpiece.type === piecetype.PAWN)
          moves = getPawnMoves(row, col, board);
        if (currentpiece.type === piecetype.ELEPHANT)
          moves = getElepMoves(row, col, board);
        if (currentpiece.type === piecetype.HORSE)
          moves = getHorseMoves(row, col, board);
        if (currentpiece.type === piecetype.CAMMEL)
          moves = getCamelMoves(row, col, board);
        if (currentpiece.type === piecetype.QUEEN)
          moves = getQueenMoves(row, col, board);
        if (currentpiece.type === piecetype.KING)
          moves = getKingMoves(row, col, board);

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
