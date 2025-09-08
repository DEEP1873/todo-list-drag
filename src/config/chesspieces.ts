enum piecetyp {
  QUEEN = "Queen",
  HORSE = "Horse",
  CAMMEL = "Camel",
  ELEPHANT = "Elephant",
  PAWN = "Pawn",
  KING = "King",
}



export enum PieceColor {
  WHITE = "white",
  BLACK = "black",
}

export interface Piecety {
  type: piecetyp;
  color: PieceColor;
}

export interface PromotionOption {
  name: string;
  symbol: string;
}  

export default piecetyp ;