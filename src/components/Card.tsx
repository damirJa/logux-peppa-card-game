import React from 'react';
import { motion } from 'motion/react';
import { useDrag } from 'react-dnd';
import type { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onFlip: ({ cardId, isFaceUp }: { cardId: string; isFaceUp: boolean }) => void;
  onMove: ({ cardId, x, y }: { cardId: string, x: number, y: number }) => void;
}

const CARD_WIDTH = 120;
const CARD_HEIGHT = 160;

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
        // Account for the initial grab offset
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
      style={{
        position: 'absolute',
        left: card.x,
        top: card.y,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.5 : 1,
        perspective: '1000px',
      }}
      onClick={() => onFlip({ cardId: card.id, isFaceUp: !card.isFaceUp })}
    >
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
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
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#2c3e50',
            borderRadius: '8px',
            border: '2px solid #34495e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          Card Cover
        </div>

        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          <img
            src={card.imgSrc}
            alt={`Card ${card.id}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
