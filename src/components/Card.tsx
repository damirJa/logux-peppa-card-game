import React from 'react';
import { motion } from 'motion/react';
import { useDrag } from 'react-dnd';
import type { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onFlip: ({ cardId, isFaceUp }: { cardId: string; isFaceUp: boolean }) => void;
  onMove: (id: string, x: number, y: number) => void;
}

const CARD_WIDTH = 120;
const CARD_HEIGHT = 160;

export const Card: React.FC<CardProps> = ({ card, onFlip, onMove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { id: card.id, x: card.x, y: card.y },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && monitor.didDrop()) {
        const offset = monitor.getDifferenceFromInitialOffset();
        if (offset) {
          const newX = item.x + offset.x;
          const newY = item.y + offset.y;
          onMove(card.id, newX, newY);
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <motion.div
      ref={drag}
      style={{
        position: 'absolute',
        left: card.x,
        top: card.y,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.5 : 1,
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
      onClick={() => onFlip({ cardId: card.id, isFaceUp: !card.isFaceUp })}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d'
      }}>
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
            border: '2px solid #e74c3c',
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
      </div>
    </motion.div>
  );
};
