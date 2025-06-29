import { atom, map } from 'nanostores';
import type { Card } from '../types';

// Store for all cards (using map for individual card management)
export const $cards = map<Record<string, Card>>({});

// Store for tracking loading state
export const $cardsLoading = atom(false);

export const flipCard = (cardId: string, isFaceUp: boolean) => {
  const currentCards = $cards.get();
  if (currentCards[cardId]) {
    $cards.setKey(cardId, {
      ...currentCards[cardId],
      isFaceUp
    });
  }
};

export const moveCard = (cardId: string, x: number, y: number) => {
  const currentCards = $cards.get();
  if (currentCards[cardId]) {
    $cards.setKey(cardId, {
      ...currentCards[cardId],
      x,
      y
    });
  }
};

export const moveUpdateStore = (card: Card) => {
  const currentCards = $cards.get();
  if (currentCards[card.id]) {
    $cards.setKey(card.id, {
      ...card,
    });
  }
}

export const getCard = (cardId: string): Card | undefined => {
  return $cards.get()[cardId];
};

export const getAllCards = (): Card[] => {
  return Object.values($cards.get());
};
