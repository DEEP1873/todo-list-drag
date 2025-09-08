import React, { useEffect, useState } from "react";
import piecetyp from "../config/chesspieces";

import { PieceColor, type Piecety } from "../config/chesspieces";
import { initialBoard, getPieceSymbol } from "../config/boardsetup";
import {
  type Move,
  getLegalMoves,
  getMoves,
  getPawnMoves,
} from "../config/moves";
import { isInCheck, checkCheckmate, findKingPosition } from "../config/rules";
import Board from "./Boards/Board";
import Sidebar from "./SideBars/Sidebar";
import MoveHistory from "./SideBars/MoveHistory";

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
        target.color !== piece?.color &&
        checkCheckmate(board, target.color)
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
      if (piece?.type === piecetyp.PAWN && (row === 0 || row === 7)) {
        const legalMoves = getLegalMoves(selRow, selCol, board, piece?.color);
        if (legalMoves.some(([r, c]) => r === row && c === col)) {
          if (target?.type === piecetyp.KING) {
            setSelect(null);
            setHighlightedMoves([]);
            return;
          }

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

      if (piece && piece.color) {
        validMoves = getLegalMoves(selRow, selCol, board, piece.color);
      }

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
          setWinner(true);
          return;
        } else if (
          isInCheck(newboard, opponentColor) &&
          piece?.type !== piecetyp.KING
        ) {
          console.log("comes in check");
        }

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

    if (blackKing && isInCheck(board, PieceColor.BLACK)) {
      setCheckedKing(blackKing);
    } else if (whiteKing && isInCheck(board, PieceColor.WHITE)) {
      setCheckedKing(whiteKing);
    } else {
      setCheckedKing(null);
    }
  }, [board]);

  return (
    <div className="flex flex-col sm:flex-col lg:flex-row absolute top-0 w-full h-screen">
      <Sidebar
        whiteTurn={whiteTurn}
        winner={winner}
        onRestart={onRestart}
        timeLeft={timeLeft}
        moves={moves}
        showChoicePopup={showChoicePopup}
        handlePromotion={handlePromotion}
        setTimeLeft={setTimeLeft}
        classname="block lg:hidden "
      />
      <Board
        board={board}
        highlightedMoves={highlightedMoves}
        handleclick={handleclick}
        whiteTurn={whiteTurn}
        blackTurn={blackTurn}
        checkedKing={checkedKing}
        getPieceSymbol={getPieceSymbol}
        PieceColor={PieceColor}
      />
        <Sidebar
        whiteTurn={whiteTurn}
        winner={winner}
        onRestart={onRestart}
        timeLeft={timeLeft}
        moves={moves}
        showChoicePopup={showChoicePopup}
        handlePromotion={handlePromotion}
        setTimeLeft={setTimeLeft}
        classname="hidden lg:block  "
      />

      <MoveHistory moves={moves} classname="block lg:hidden "/>
    </div>
  );
};

export default Chess;
