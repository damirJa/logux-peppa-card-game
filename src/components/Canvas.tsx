import React from 'react';
import { useDrop } from 'react-dnd';
import { useStore } from '@nanostores/react';
import { Card } from './Card';
import { flipCard, moveCard } from '../logux';
import { $cards } from '../stores/cards';

export const Canvas: React.FC = () => {
  const cardsMap = useStore($cards);
  const cards = Object.values(cardsMap);
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
