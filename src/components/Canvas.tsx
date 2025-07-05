import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useStore } from '@nanostores/react';
import { Card } from './Card';
import { Cursor } from './Cursor';
import type { Card as CardType } from '../types';
import { CustomDragLayer } from './CustomDragLayer';
import { flipCard, moveCard, moveCursor } from '../logux';
import { $cards } from '../stores/cards';
import { $cursors } from '../stores/cursors';
import {
  calculateScaleFactor,
  prepareCardsWithScale,
  normalizeCoordinates,
  DEFAULT_CANVAS_WIDTH
} from '../utils/canvas';

export const Canvas: React.FC = () => {
  const cardsMap = useStore($cards);
  const cards = Object.values(cardsMap);
  const cursors = useStore($cursors);
  const [canvasWidth, setCanvasWidth] = useState(DEFAULT_CANVAS_WIDTH);

  const scaleFactor = useMemo(() =>
    calculateScaleFactor(canvasWidth),
    [canvasWidth]
  );

  const scaledCards = useMemo(() =>
    prepareCardsWithScale(cards, scaleFactor),
    [cards, scaleFactor]
  );

  useEffect(() => {
    const updateCanvasWidth = () => {
      const canvasElement = document.querySelector('[data-canvas]');
      if (canvasElement) {
        const rect = canvasElement.getBoundingClientRect();
        setCanvasWidth(rect.width);
      }
    };

    updateCanvasWidth();
    window.addEventListener('resize', updateCanvasWidth);
    return () => window.removeEventListener('resize', updateCanvasWidth);
  }, []);
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

        // Normalize coordinates back to original scale for storage
        const normalized = normalizeCoordinates(dropX, dropY, scaleFactor);

        return {
          x: normalized.x,
          y: normalized.y,
          offsetX,
          offsetY,
          scaleFactor
        };
      }
      return {};
    },
  });

  const handleFlip = ({ id, isFaceUp, found }: CardType) => {
    if (!found) {
      flipCard({ cardId: id, isFaceUp });
    }
  };

  const handleMove = ({ cardId, x, y }: { cardId: string, x: number, y: number }) => {
    moveCard({ cardId, x, y });
  };

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const canvasRect = document.querySelector('[data-canvas]')?.getBoundingClientRect();
    if (canvasRect) {
      const x = event.clientX - canvasRect.left;
      const y = event.clientY - canvasRect.top;
      const normalized = normalizeCoordinates(x, y, scaleFactor);
      moveCursor({ x: normalized.x, y: normalized.y });
    }
  }, [scaleFactor]);

  return (
    <div
      ref={drop}
      className="w-screen h-screen px-4 relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100"
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 w-2/5 h-2/5 rounded-full bg-radial from-pink-200 from-30% to-transparent blur-xl"></div>
        <div className="absolute top-1/3 right-20 w-2/5 h-2/5 rounded-full bg-radial from-purple-200 from-25% to-transparent blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-2/5 h-2/5 rounded-full bg-radial from-indigo-200 from-35% to-transparent blur-xl"></div>
        <div className="absolute bottom-10 right-1/3 w-2/5 h-2/5 rounded-full bg-radial from-rose-200 from-40% to-transparent blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 w-2/5 h-2/5 rounded-full bg-radial-[at_30%_30%] from-white from-20% to-transparent blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div
        data-canvas
        className='relative w-full h-full max-w-[860px] max-h-[660px]'
        onMouseMove={handleMouseMove}>
        {/* Cards */}
        {scaledCards.map(card => (
          <Card
            key={card.id}
            card={card}
            onFlip={handleFlip}
            onMove={handleMove}
            scaleFactor={scaleFactor}
          />
        ))}
        {/* Custom drag layer for mobile preview */}
        <CustomDragLayer scaleFactor={scaleFactor} />

        {/* Other users' cursors */}
        {Object.values(cursors).map(cursor => (
          <Cursor
            key={cursor.userId}
            x={cursor.x}
            y={cursor.y}
            userId={cursor.userId}
            scaleFactor={scaleFactor}
          />
        ))}

      </div>

    </div>
  );
};
