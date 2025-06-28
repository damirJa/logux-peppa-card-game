import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Card } from './Card';
import type { Card as CardType } from '../types';
import { flipCard, moveCard } from '../logux';

const INITIAL_CARDS: CardType[] = [
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 50, y: 50, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=120&h=160&fit=crop', x: 200, y: 50, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&h=160&fit=crop', x: 350, y: 50, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 50, y: 250, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=120&h=160&fit=crop', x: 200, y: 250, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 350, y: 250, isFaceUp: false },
];

export const Canvas: React.FC = () => {
  const [cards] = useState<CardType[]>(INITIAL_CARDS);

  const [, drop] = useDrop({
    accept: 'card',
    drop: () => ({}),
  });

  const handleFlip = ({ cardId, isFaceUp }: { cardId: string; isFaceUp: boolean }) => {
    flipCard({ cardId, isFaceUp });
  };

  const handleMove = ({ cardId, x, y }: { cardId: string, x: number, y: number }) => {
    moveCard({ cardId, x, y });
  };

  return (
    <div
      ref={drop}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1a252f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          onFlip={handleFlip}
          onMove={handleMove}
        />
      ))}
    </div>
  );
};
