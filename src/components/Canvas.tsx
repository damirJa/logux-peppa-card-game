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
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const initialClientOffset = monitor.getInitialClientOffset();
      const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
      const canvasRect = document.querySelector('[data-canvas]')?.getBoundingClientRect();
      
      if (clientOffset && initialClientOffset && initialSourceClientOffset && canvasRect) {
        // Calculate the offset between mouse position and card's top-left corner when drag started
        const offsetX = initialClientOffset.x - initialSourceClientOffset.x;
        const offsetY = initialClientOffset.y - initialSourceClientOffset.y;
        
        // Calculate drop position relative to canvas
        const dropX = clientOffset.x - canvasRect.left;
        const dropY = clientOffset.y - canvasRect.top;
        
        return { 
          x: dropX, 
          y: dropY, 
          offsetX, 
          offsetY 
        };
      }
      return {};
    },
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
      data-canvas
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
