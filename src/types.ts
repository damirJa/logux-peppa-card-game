export interface Card {
  id: string;
  imgSrc: string;
  x: number;
  y: number;
  isFaceUp: boolean;
}

// Logux action types
export interface CardFlipAction {
  type: 'card/flip';
  cardId: string;
  isFaceUp: boolean;
  userId: string;
}

export interface CardMoveAction {
  type: 'card/move';
  cardId: string;
  x: number;
  y: number;
  userId: string;
}

export interface CardsLoadedAction {
  type: 'cards/loaded';
  cards: Card[];
}

export interface CardsLoadAction {
  type: 'cards/load';
  userId: string;
}
