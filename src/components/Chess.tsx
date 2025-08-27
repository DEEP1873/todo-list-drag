import React, { useState } from "react";

const pieces: Record<string, string> = {
  K: "♔",
  Q: "♕",
  E: "♖",
  C: "♗",
  H: "♘",
  P: "♙", // White
  k: "♚",
  q: "♛",
  e: "♜",
  c: "♝",
  h: "♞",
  p: "♟︎", // Black
};

const initialBoard: string[][] = [
  ["e", "h", "c", "k", "q", "c", "h", "e"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["E", "H", "C", "Q", "K", "C", "H", "E"],
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
  const [finalCoordinates, setFinalCoordinates] = useState<[number, number][]>(
    []
  );

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

  const getPawnMoves = (
    row: number,
    col: number,
    board: string[][]
  ): [number, number][] => {
    const piece = board[row][col];
    const moves: [number, number][] = [];

    //white board
    if (piece === "P") {
      //forward moves
      if (row > 0 && board[row - 1][col] === "") {
        moves.push([row - 1, col]);
        if (row === 6 && board[row - 2][col] === "") {
          moves.push([row - 2, col]);
        }
      }

      //diagonal moves
      if (
        row > 0 &&
        col >= 0 &&
        board[row - 1][col - 1] &&
        board[row - 1][col - 1] !== board[row - 1][col - 1].toUpperCase()
      ) {
        moves.push([row - 1, col - 1]);
      }
      if (
        row > 0 &&
        col <= 7 &&
        board[row - 1][col + 1] &&
        board[row - 1][col + 1] !== board[row - 1][col + 1].toUpperCase()
      ) {
        moves.push([row - 1, col + 1]);
      }

      console.log(moves);
    }
    if (piece === "p") {
      if (row < 7 && board[row + 1][col] === "") {
        moves.push([row + 1, col]);
        if (row === 1 && board[row + 2][col] === "") {
          moves.push([row + 2, col]);
        }
      }

      if (
        row < 7 &&
        col < 7 &&
        board[row + 1][col + 1] &&
        board[row + 1][col + 1] !== board[row + 1][col + 1].toLowerCase()
      ) {
        moves.push([row + 1, col + 1]);
      }
      if (
        row < 7 &&
        col > 0 &&
        board[row + 1][col - 1] &&
        board[row + 1][col - 1] !== board[row + 1][col - 1].toLowerCase()
      ) {
        moves.push([row + 1, col - 1]);
      }
    }

    return moves;
  };

  const getElepMoves = (
    row: number,
    col: number,
    board: string[][]
  ): [number, number][] => {
    const piece = board[row][col];
    const isWhite = piece === piece.toUpperCase();
    const moves: [number, number][] = [];

    const exploreDirection = (dr: number, dc: number) => {
      let r = row + dr;
      let c = col + dc;

      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const target = board[r][c];

        if (target === "") {
          // Empty → can move
          moves.push([r, c]);
        } else if ((target === target.toUpperCase()) === isWhite) {
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
      console.log(moves);
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
    board: string[][]
  ): [number, number][] => {
    const piece = board[row][col];
    const isWhite = piece === piece.toUpperCase();
    const moves: [number, number][] = [];

    const exploreMove = (dr: number, dc: number) => {
      const r = row + dr;
      const c = col + dc;

      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const target = board[r][c];

        if (target === "") {
          // Empty square  valid
          moves.push([r, c]);
        } else if ((target === target.toUpperCase()) !== isWhite) {
          // Opponent piece capture allowed
          moves.push([r, c]);
        }
      }
    };

    const knightMoves = [
      [-2, -1],
      [-2, 1], // Up 2
      [2, -1],
      [2, 1], // Down 2
      [-1, -2],
      [-1, 2], // Up 1
      [1, -2],
      [1, 2], // Down 1
    ];

    knightMoves.forEach(([dr, dc]) => exploreMove(dr, dc));

    return moves;
  };

  const getCamelMoves = (
    row: number,
    col: number,
    board: string[][]
  ): [number, number][] => {
    const piece = board[row][col];
    const isWhite = piece === piece.toUpperCase();
    const moves: [number, number][] = [];

    const exploreDirection = (dr: number, dc: number) => {
      let r = row + dr;
      let c = col + dc;

      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const target = board[r][c];

        if (target === "") {
          moves.push([r, c]);
        } else if ((target === target.toUpperCase()) === isWhite) {
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
    board: string[][]
  ): [number, number][] => {
    console.log("enter in the queen function");

    const elephant = getElepMoves(row, col, board); // rook-like moves
    const camel = getCamelMoves(row, col, board); // bishop-like moves

    return [...elephant, ...camel];
  };

  const getKingMoves = (
    row: number,
    col: number,
    board: string[][]
  ): [number, number][] => {
    const piece = board[row][col];
    const isWhite = piece === piece.toUpperCase();
    const moves: [number, number][] = [];

    const exploreDirection = (dr: number, dc: number) => {
      const r = row + dr;
      const c = col + dc;

      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const target = board[r][c];
        if (target === "") {
          moves.push([r, c]);
        } else if ((target === target.toUpperCase()) !== isWhite) {
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
    return `${FILES[col]}${8 - row}`;
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
    console.log(row, col);

    if (select) {
      setFinalCoordinates([...finalCoordinates, [row, col]]);
      const [selRow, selCol] = select;
      const piece = board[selRow][selCol];
      const isWhite = piece === piece.toUpperCase();
      const target = board[row][col];
      const symbol = pieces[board[selRow][selCol]];



        
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


      if (target.toUpperCase() === "K") {
        const newboard = board.map((prev) => [...prev]);
        newboard[row][col] = piece;
        newboard[selRow][selCol] = "";

        setBoard(newboard);
        setSelect(null);
        setWinner(true);
        // alert(`King captured! finished game... ${color} win `);
        setHighlightedMoves([]);
        //  setBlackTurn(!blackTurn);
        // setWhiteTurn(!whiteTurn);

        return;
      }

      if (piece.toUpperCase() === "P") {
        validMoves = getPawnMoves(selRow, selCol, board);
      }

      if (piece.toUpperCase() === "E") {
        validMoves = getElepMoves(selRow, selCol, board);
      }
      if (piece.toUpperCase() === "H") {
        validMoves = getHorseMoves(selRow, selCol, board);
      }
      if (piece.toUpperCase() === "C") {
        validMoves = getCamelMoves(selRow, selCol, board);
      }

      if (piece.toUpperCase() === "Q") {
        validMoves = getQueenMoves(selRow, selCol, board);
      }

      if (piece.toUpperCase() === "K") {
        validMoves = getKingMoves(selRow, selCol, board);
      }

      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);

      if (isValidMove) {
        const newboard = board.map((prev) => [...prev]);
        newboard[row][col] = piece;
        newboard[selRow][selCol] = "";

        setBoard(newboard);
        setSelect(null);
        setHighlightedMoves([]);

        setBlackTurn(!blackTurn);
        setWhiteTurn(!whiteTurn);
      } else {
        setSelect(null);
        setHighlightedMoves([]); // invalid move, deselect
      }
    } else {
      const currentpiece = board[row][col];
      if (currentpiece !== "" && !winner) {
        const isWhitePiece = currentpiece === currentpiece.toUpperCase();
        const isBlackPiece = currentpiece === currentpiece.toLowerCase();

        if ((whiteTurn && isWhitePiece) || (blackTurn && isBlackPiece)) {
          setSelect([row, col]);
        } else {
          return;
        }

        let moves: [number, number][] = [];
        if (currentpiece.toUpperCase() === "P")
          moves = getPawnMoves(row, col, board);
        if (currentpiece.toUpperCase() === "E")
          moves = getElepMoves(row, col, board);
        if (currentpiece.toUpperCase() === "H")
          moves = getHorseMoves(row, col, board);
        if (currentpiece.toUpperCase() === "C")
          moves = getCamelMoves(row, col, board);
        if (currentpiece.toUpperCase() === "Q")
          moves = getQueenMoves(row, col, board);
        if (currentpiece.toUpperCase() === "K")
          moves = getKingMoves(row, col, board);

        setHighlightedMoves(moves);
      }
    }

    console.log("Turns → Black:", blackTurn, "White:", whiteTurn);
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
              <div className="text-white font-bold p-4">{rowIndex}</div>

              {row.map((col, colindex) => {
                const isDark = (rowIndex + colindex) % 2 === 1;
                const isHighlighted = highlightedMoves.some(
                  ([r, c]) => r === rowIndex && c === colindex
                );

                const piece = board[rowIndex][colindex];
                const isWhitePiece = piece === piece.toUpperCase() && piece !== "";
                const isBlackPiece = piece === piece.toLowerCase() && piece !== "";
                const isClickable =
                  (whiteTurn && isWhitePiece) ||
                  (blackTurn && isBlackPiece) ||
                  piece === "";

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
                    {col && <span>{pieces[col]}</span>}

                    {/* Show dot only if it's a highlighted square and EMPTY */}
                    {isHighlighted && !col && (
                      <div className="absolute w-3 h-3 bg-black rounded-full opacity-80"></div>
                    )}
                  </div>
                );
              })}

              <div className="text-white font-bold p-4">{rowIndex}</div>
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
