import React from 'react';
import { useDragLayer } from 'react-dnd';
import type { Card as CardType } from '../types';
import { DEFAULT_CARD_WIDTH, DEFAULT_CARD_HEIGHT } from '../utils/canvas';

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(
  initialOffset: { x: number; y: number } | null,
  currentOffset: { x: number; y: number } | null,
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

interface CustomDragLayerProps {
  scaleFactor: number;
}

export const CustomDragLayer: React.FC<CustomDragLayerProps> = ({ scaleFactor }) => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  function renderItem() {
    switch (itemType) {
      case 'card':
        const card = item as CardType;
        const scaledWidth = DEFAULT_CARD_WIDTH * scaleFactor;
        const scaledHeight = DEFAULT_CARD_HEIGHT * scaleFactor;
        return (
          <div 
            className="rounded-lg overflow-hidden shadow-lg opacity-80"
            style={{ 
              width: scaledWidth, 
              height: scaledHeight 
            }}
          >
            <img
              src={card.isFaceUp ? card.imgSrc : "/cover_image.jpg"}
              alt="Card preview"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        );
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset)}
      >
        {renderItem()}
      </div>
    </div>
  );
};
