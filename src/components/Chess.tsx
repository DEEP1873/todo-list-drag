import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import ChoicePopUpScreen from "./ChoicePopUpScreen";
// import type { pieces } from "../config/chesspieces";
import piecetyp from "../config/chesspieces";
import PromotionOption from "../config/chesspieces";

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

interface ChoicePopUpScreen {
  options: PromotionOption[];
  onSelect: (pieceName: string, pieceSymbol: string) => void;
}

const Chess: React.FC = () => {
  const [board, setBoard] = useState(initialBoard);
  const [select, setSelect] = useState<[number, number] | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [moves, setMoves] = useState<Move[]>([]);
  const [blackTurn, setBlackTurn] = useState(false);
  const [whiteTurn, setWhiteTurn] = useState<boolean>(true);
  const [highlightedMoves, setHighlightedMoves] = useState<[number, number][]>(
    []
  );
  const [winner, setWinner] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [showChoicePopup, setShowChoicePopup] = useState(false);
  const [promotionSquare, setPromotionSquare] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [checkedKing, setCheckedKing] = useState<[number, number] | null>(null);

  const FILES = Array.from({ length: 8 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const colval2 = 8;

  const findKingPosition = (
    board: (Piecety | null)[][],
    color: PieceColor
  ): [number, number] | null => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.type === piecetyp.KING && piece.color === color) {
          return [r, c];
        }
      }
    }
    return null;
  };

  const isInCheck = (
    board: (Piecety | null)[][],
    color: PieceColor
  ): boolean => {
    const kingPos = findKingPosition(board, color);
    if (!kingPos) return false;
    const [kingRow, kingCol] = kingPos;
    const opponentColor =
      color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.color === opponentColor) {
          const moves = getMoves(r, c, board);
          const kingCheckPath = moves.some(
            ([mr, mc]) => mr === kingRow && mc === kingCol
          );
          if (kingCheckPath) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const checkCheckmate = (
    board: (Piecety | null)[][],
    color: PieceColor
  ): boolean => {
    if (!isInCheck(board, color)) return false;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.color === color) {
          const moves = getMoves(r, c, board);
          for (const [mr, mc] of moves) {
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

  const getPawnMoves = (
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

  // inside your Chess component (after getMoves and getPawnMoves)

const getLegalMoves = (
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


  const getSquare = (row: number, col: number): string => {
    return `${FILES[col]}${colval2 - row}`;
  };

  const onRestart = () => {
    setTimeLeft(30);
    setBoard(initialBoard);
    setSelect(null);
    setHighlightedMoves([]);
    setMoves([]);
    setWinner(false);

    setBlackTurn(false);
    setWhiteTurn(true);
    return;
  };

  const handleclick = (row: number, col: number) => {
    if (select) {
      const [selRow, selCol] = select;
      const piece = board[selRow][selCol];
      // const isWhite =  PieceColor.WHITE;
      const target = board[row][col];
      const symbol = getPieceSymbol(piece);

      let validMoves: [number, number][] = [];

      if (
        target &&
        target.type === piecetyp.KING &&
        target.color !== piece?.color
      ) {
        const newboard = board.map((prev) => [...prev]);
        newboard[row][col] = piece;
        newboard[selRow][selCol] = null;

        setBoard(newboard);
        setSelect(null);
        setWinner(true);

        setHighlightedMoves([]);
        return;
      }

      if (
        piece?.type === piecetyp.PAWN &&
        (row === 7 || row === 0) &&
        piece.color !== target?.color
      ) {
        const newboard = board.map((prev) => [...prev]);
        newboard[row][col] = piece;
        newboard[selRow][selCol] = null;

        setBoard(newboard);
        setSelect(null);
        setHighlightedMoves([]);
        setPromotionSquare({ row, col });
        setShowChoicePopup(true);
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
      
      validMoves = getLegalMoves(selRow, selCol, board, piece?.color);
      
      var isValidMove = validMoves.some(([r, c]) => r === row && c === col);

      if (isValidMove) {
        const fromSquare = getSquare(selRow, selCol);
        const toSquare = getSquare(row, col);

        const addMove = (from: string, to: string, symbol: string) => {
          setMoves((prev) => [
            ...prev,
            { id: prev.length + 1, from, to, symbol },
          ]);
        };
        addMove(fromSquare, toSquare, symbol);
        const target = board[row][col];

        if (target && target.color === piece?.color) {
          setSelect(null);
          setHighlightedMoves([]);
          return; // stop here
        }
        const newboard = board.map((prev) => [...prev]);
        newboard[row][col] = piece;
        newboard[selRow][selCol] = null;

        // Opponent color
        const opponentColor =
          piece?.color === PieceColor.WHITE
            ? PieceColor.BLACK
            : PieceColor.WHITE;

        if (checkCheckmate(newboard, opponentColor)) {
          // setWinner(true);
          console.log("comes in checkmate");
          setAlertMessage("Checkmate!");
          setTimeout(() => setAlertMessage(null), 3000);
        } else if (
          isInCheck(newboard, opponentColor) &&
          piece?.type !== piecetyp.KING
        ) {
          console.log("comes in check");
          setAlertMessage("Check!");
          // setTimeout(() => setAlertMessage(null), 3000);

          // alert("Check!");
        }
        // setAlertMessage(null);
        setBoard(newboard);
        setSelect(null);
        setHighlightedMoves([]);
        setTimeLeft(30);
        setBlackTurn(!blackTurn);
        setWhiteTurn(!whiteTurn);
      } else {
        setSelect(null);
        setHighlightedMoves([]);
      }
    } else {
      setAlertMessage(null);
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

        // if(){

        // }

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

        const movess = getLegalMoves(row, col, board, currentpiece.color);
        setHighlightedMoves(movess);

        setHighlightedMoves(moves);
      }
    }
  };

  const countPieces = (
    board: (Piecety | null)[][],
    pieceType: piecetyp,
    color: PieceColor
  ) => {
    return board
      .flat()
      .filter((cell) => cell?.type === pieceType && cell?.color === color)
      .length;
  };

  // Handle promotion callback
  const handlePromotion = (pieceName: string, pieceSymbol: string) => {
    if (!promotionSquare) return;
    console.log("Promoted to:", pieceName, pieceSymbol);
    const { row, col } = promotionSquare;

    const currentPiece = board[row][col];
    if (!currentPiece) return;

    const existingCount = countPieces(
      board,
      pieceName as piecetyp,
      currentPiece.color
    );

    if (existingCount >= 3) {
      alert(`You can only have 3 ${pieceName}s on the board!`);
      return;
    }

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((r) => [...r]);

      const currentPiece = prevBoard[row][col];
      if (!currentPiece) return newBoard;
      newBoard[row][col] = {
        type: pieceName as piecetyp,
        color: currentPiece.color,
      };

      return newBoard;
    });

    setPromotionSquare(null);
    setShowChoicePopup(false);
    setBlackTurn(!blackTurn);
    setWhiteTurn(!whiteTurn);
  };

  useEffect(() => {
    if (timeLeft === 0 && !winner) {
      setTimeLeft(30);
      setBlackTurn(!blackTurn);
      setWhiteTurn(!whiteTurn);
    }

    // stop when time ends

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [timeLeft]);

  useEffect(() => {
    const whiteKing = findKingPosition(board, PieceColor.WHITE);
    const blackKing = findKingPosition(board, PieceColor.BLACK);

    if (whiteKing && isInCheck(board, PieceColor.WHITE)) {
      setCheckedKing(whiteKing);
    } else if (blackKing && isInCheck(board, PieceColor.BLACK)) {
      setCheckedKing(blackKing);
    } else {
      setCheckedKing(null);
    }
  }, [board]);

  return (
    <div className="flex flex-row  absolute top-0 w-full h-full">
      <div className="inline-block p-2   m-auto my-15 ">
        {/* Board */}
        <div className="flex flex-col">
          {/* leftpart */}
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex ">
              <div className="text-white font-bold p-4 drop-shadow-[3px_3px_3px_black]">
                {8 - rowIndex}
              </div>

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
                    className={`flex items-center text-3xl h-17 w-17 justify-center shadow-2xl ${
                      isDark ? "bg-[#b58863]" : "bg-[#f0d9b5]"
                    }
                    ${
                      isHighlighted && col
                        ? "border-4 border-red-600 cursor-pointer"
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
                    <span>{getPieceSymbol(col)}</span>

                    {isHighlighted && !col && (
                      <div className="absolute w-3 h-3 bg-black rounded-full opacity-80"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom letters */}

        <div className="flex justify-center font-bold mb-1 px-12 gap-3 text-white  drop-shadow-[3px_3px_3px_black] items-center">
          {FILES.map((file) => (
            <div key={file} className="w-14 text-center">
              {file}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 w-[37%] h-full rounded-2xl m-auto">
        <div className="flex mt-2 p-5 rounded-2xl justify-center bg-gradient-to-r from-amber-900 to-amber-100 text-black text-2xl shadow-xl border border-amber-200">
          {whiteTurn ? (
            winner ? (
              <div className="text-black font-bold flex flex-col items-center gap-3">
                <Confetti />
                <p className="text-3xl">🎉 White Wins 🎉</p>
                <button
                  onClick={onRestart}
                  className="px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-700 transition shadow-md"
                >
                  Restart
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-full items-center">
                <div className="flex flex-row justify-between w-full items-center">
                  <div className="m-auto text-black font-bold tracking-wide">
                    ♔ White's Turn
                  </div>
                  <div className="flex justify-center items-center h-12 w-12 shadow-xl border-2 border-amber-900 rounded-full bg-amber-50">
                    <h1 className="text-xl font-bold">{timeLeft}</h1>
                  </div>
                </div>
                {/* ⚠️ Red alert text */}
                {alertMessage && (
                  <p className="text-red-600 text-lg font-semibold mt-2 shadow-2xl">
                    {alertMessage}
                  </p>
                )}
              </div>
            )
          ) : winner ? (
            <div className="text-black font-bold flex flex-col items-center gap-3">
              <Confetti />
              <p className="text-3xl">🎉 Black Wins 🎉</p>
              <button
                onClick={onRestart}
                className="px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-700 transition shadow-md"
              >
                Restart
              </button>
            </div>
          ) : (
            <div className="flex flex-col w-full items-center">
              <div className="flex flex-row justify-between w-full items-center">
                <div className="m-auto text-black font-bold tracking-wide">
                  ♚ Black's Turn
                </div>
                <div className="flex justify-center items-center h-12 w-12 shadow-xl border-2 border-amber-900 rounded-full bg-amber-50">
                  <h1 className="text-xl font-bold">{timeLeft}</h1>
                </div>
              </div>
              {/* ⚠️ Red alert text */}
              {alertMessage && (
                <p className="text-red-600 text-lg font-semibold mt-2 shadow-2xl">
                  {alertMessage}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Moves History Section */}
        <div className="flex flex-col p-5 bg-gradient-to-r from-amber-900 to-amber-100 rounded-2xl text-black shadow-inner border border-amber-200 overflow-y-auto h-full">
          <h2 className="font-extrabold mb-4 shadow-lg bg-amber-100 rounded-xl px-6 py-2 self-center text-lg">
            📜 Moves History
          </h2>
          <div className="flex flex-col gap-3">
            {moves.length === 0 ? (
              <p className="text-center italic">No moves yet...</p>
            ) : (
              moves.map((move) => (
                <div
                  key={move.id}
                  className="text-lg p-3 bg-amber-50 border border-amber-900 shadow-md rounded-xl font-semibold flex justify-between items-center hover:bg-amber-100 transition"
                >
                  <span>
                    {move.id}. {move.symbol}
                  </span>
                  <span className="text-sm">
                    ➡ {move.from} → {move.to}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="relative">
          {showChoicePopup && <ChoicePopUpScreen onSelect={handlePromotion} />}
        </div>
      </div>
    </div>
  );
};

export default Chess;
