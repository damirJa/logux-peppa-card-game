import React from 'react';
import { motion } from 'motion/react';
import { useDrag } from 'react-dnd';
import { cn } from '../lib/utils';
import type { Card as CardType } from '../types';
import { DEFAULT_CARD_HEIGHT, DEFAULT_CARD_WIDTH } from '../utils/canvas';

interface CardProps {
  card: CardType & { scaledX?: number; scaledY?: number; scaledWidth?: number; scaledHeight?: number };
  onFlip: (card: CardType) => void;
  onMove: ({ cardId, x, y }: { cardId: string, x: number, y: number }) => void;
  scaleFactor: number;
}

export const Card: React.FC<CardProps> = ({ card, onFlip, onMove, scaleFactor }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      // Pass full card data for preview
      return {
        id: card.id,
        x: card.x,
        y: card.y,
        imgSrc: card.imgSrc,
        isFaceUp: card.isFaceUp,
      };
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ x: number; y: number; offsetX: number; offsetY: number; scaleFactor: number }>();
      if (dropResult && monitor.didDrop() && dropResult.x !== undefined && dropResult.y !== undefined) {
        // The coordinates are already normalized in Canvas drop handler
        const finalX = dropResult.x - (dropResult.offsetX || 0) / (dropResult.scaleFactor || 1);
        const finalY = dropResult.y - (dropResult.offsetY || 0) / (dropResult.scaleFactor || 1);
        console.log('Card dropped at (normalized):', finalX, finalY);
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
      className={cn(
        'absolute rounded-lg overflow-hidden shadow-lg',
        card.found && 'ring-3 ring-rose-400/30',
        isDragging ? 'cursor-grabbing opacity-50' : 'transition-all cursor-grab opacity-100'
      )}
      style={{
        left: card.scaledX ?? card.x,
        top: card.scaledY ?? card.y,
        width: card.scaledWidth ?? DEFAULT_CARD_WIDTH,
        height: card.scaledHeight ?? DEFAULT_CARD_HEIGHT,
        perspective: '1000px',
      }}
      onClick={() => onFlip({ ...card, isFaceUp: !card.isFaceUp })}
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
          className="absolute backface-hidden w-full h-full "
        >
          <img
            src="/cover_image.jpg"
            alt="Card back"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Card Front (Image) */}
        <div
          className={
            cn(
              "absolute transition-opacity backface-hidden w-full h-full rounded-lg overflow-hidden shadow-lg",
              card.isFaceUp ? 'opacity-100' : 'opacity-0'
            )
          }
          style={{
            transform: 'rotateY(180deg)',
          }}
        >
          <img
            src={card.imgSrc}
            alt={`Card ${card.id}`}
            className={cn(
              "w-full h-full object-cover",
              isDragging && !card.isFaceUp && "invisible"
            )}
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  );
};
