import { atom, map } from 'nanostores';
import { v4 as uuidv4 } from 'uuid';
import type { Card } from '../types';

// Store for all cards (using map for individual card management)
export const $cards = map<Record<string, Card>>({});

// Store for tracking loading state
export const $cardsLoading = atom(false);

// Initial cards data
const INITIAL_CARDS: Card[] = [
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 50, y: 50, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=120&h=160&fit=crop', x: 200, y: 50, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&h=160&fit=crop', x: 350, y: 50, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 50, y: 250, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=120&h=160&fit=crop', x: 200, y: 250, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 350, y: 250, isFaceUp: false },
];

// Actions for managing cards
export const initializeCards = () => {
  const cardsMap: Record<string, Card> = {};
  INITIAL_CARDS.forEach(card => {
    cardsMap[card.id] = card;
  });
  $cards.set(cardsMap);
};

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

export const getCard = (cardId: string): Card | undefined => {
  return $cards.get()[cardId];
};

export const getAllCards = (): Card[] => {
  return Object.values($cards.get());
};
