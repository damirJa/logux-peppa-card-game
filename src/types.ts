export interface Card {
  id: string;
  imgSrc: string;
  x: number;
  y: number;
  isFaceUp: boolean;
  character: string;
  found: boolean;
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

export interface CardUpdateAction {
  type: 'card/update';
  card: Card;
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

export interface CursorMoveAction {
  type: 'cursor/move';
  x: number;
  y: number;
  userId: string;
}

export interface CardsShuffleAction {
  type: 'cards/shuffle';
  userId: string;
}
