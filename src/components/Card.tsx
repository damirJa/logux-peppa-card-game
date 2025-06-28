import React from 'react';
import { motion } from 'motion/react';
import { useDrag } from 'react-dnd';
import type { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onFlip: ({ cardId, isFaceUp }: { cardId: string; isFaceUp: boolean }) => void;
  onMove: ({ cardId, x, y }: { cardId: string, x: number, y: number }) => void;
}

export const Card: React.FC<CardProps> = ({ card, onFlip, onMove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      // Get the initial offset when drag starts
      return {
        id: card.id,
        x: card.x,
        y: card.y,
      };
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ x: number; y: number; offsetX: number; offsetY: number }>();
      if (dropResult && monitor.didDrop() && dropResult.x !== undefined && dropResult.y !== undefined) {
        const finalX = dropResult.x - (dropResult.offsetX || 0);
        const finalY = dropResult.y - (dropResult.offsetY || 0);
        console.log('Card dropped at:', finalX, finalY);
        onMove({ cardId: card.id, x: finalX, y: finalY });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`absolute transition-all duration-300 w-[120px] h-[160px] ${isDragging ? 'cursor-grabbing opacity-50' : 'cursor-grab opacity-100'
        }`}
      style={{
        left: card.x,
        top: card.y,
        perspective: '1000px',
      }}
      onClick={() => onFlip({ cardId: card.id, isFaceUp: !card.isFaceUp })}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: card.isFaceUp ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >
        {/* Card Back (Cover) */}
        <div
          className="absolute w-full h-full bg-slate-700 rounded-lg border-2 border-slate-600 flex items-center justify-center text-white text-sm font-bold shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          Card Cover
        </div>

        {/* Card Front (Image) */}
        <div
          className="absolute w-full h-full rounded-lg overflow-hidden shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <img
            src={card.imgSrc}
            alt={`Card ${card.id}`}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};
