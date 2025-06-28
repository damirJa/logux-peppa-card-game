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
      className="w-screen h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-40">
        {/* Soft radial gradients for magical atmosphere */}
        <div className="absolute top-10 left-10 w-2/5 h-2/5 rounded-full bg-radial from-pink-200 from-30% to-transparent blur-xl"></div>
        <div className="absolute top-1/3 right-20 w-2/5 h-2/5 rounded-full bg-radial from-purple-200 from-25% to-transparent blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-2/5 h-2/5 rounded-full bg-radial from-indigo-200 from-35% to-transparent blur-xl"></div>
        <div className="absolute bottom-10 right-1/3 w-2/5 h-2/5 rounded-full bg-radial from-rose-200 from-40% to-transparent blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 w-2/5 h-2/5 rounded-full bg-radial-[at_30%_30%] from-white from-20% to-transparent blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Cards */}
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
