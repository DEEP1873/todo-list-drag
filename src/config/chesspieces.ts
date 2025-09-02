enum piecetyp {
  QUEEN = "Queen",
  HORSE = "Horse",
  CAMMEL = "Camel",
  ELEPHANT = "Elephant",
  PAWN = "Pawn",
  KING = "King",
}

export interface PromotionOption {
  name: string;
  symbol: string;
}  

export default piecetyp ;