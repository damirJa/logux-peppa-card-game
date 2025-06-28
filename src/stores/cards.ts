import { atom, map } from 'nanostores';
import { v4 as uuidv4 } from 'uuid';
import type { Card } from '../types';

// Store for all cards (using map for individual card management)
export const $cards = map<Record<string, Card>>({});

// Store for tracking loading state
export const $cardsLoading = atom(false);

// Initial cards data
const INITIAL_CARDS: Card[] = [
  // Row 1
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 0, y: 0, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=120&h=160&fit=crop', x: 140, y: 0, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&h=160&fit=crop', x: 280, y: 0, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=120&h=160&fit=crop', x: 420, y: 0, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=120&h=160&fit=crop', x: 560, y: 0, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=120&h=160&fit=crop', x: 700, y: 0, isFaceUp: false },
  // Row 2
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 0, y: 180, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=120&h=160&fit=crop', x: 140, y: 180, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&h=160&fit=crop', x: 280, y: 180, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=120&h=160&fit=crop', x: 420, y: 180, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=120&h=160&fit=crop', x: 560, y: 180, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=120&h=160&fit=crop', x: 700, y: 180, isFaceUp: false },
  // Row 3
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 0, y: 360, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=120&h=160&fit=crop', x: 140, y: 360, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&h=160&fit=crop', x: 280, y: 360, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=120&h=160&fit=crop', x: 420, y: 360, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=120&h=160&fit=crop', x: 560, y: 360, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=120&h=160&fit=crop', x: 700, y: 360, isFaceUp: false },
  // Row 4
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 0, y: 540, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=120&h=160&fit=crop', x: 140, y: 540, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&h=160&fit=crop', x: 280, y: 540, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=120&h=160&fit=crop', x: 420, y: 540, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=120&h=160&fit=crop', x: 560, y: 540, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=120&h=160&fit=crop', x: 700, y: 540, isFaceUp: false },
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
