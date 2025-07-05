export interface ScaleConfig {
  defaultWidth: number;
  currentWidth: number;
  cardWidth: number;
  cardHeight: number;
}

export interface ScaledCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CardWithScaledCoords {
  id: string;
  imgSrc: string;
  x: number;
  y: number;
  isFaceUp: boolean;
  scaledX: number;
  scaledY: number;
  scaledWidth: number;
  scaledHeight: number;
}

export const DEFAULT_CANVAS_WIDTH = 860;
export const DEFAULT_CARD_WIDTH = 100;
export const DEFAULT_CARD_HEIGHT = 140;

export function calculateScaleFactor(currentWidth: number, defaultWidth: number = DEFAULT_CANVAS_WIDTH): number {
  if (currentWidth >= defaultWidth) {
    return 1;
  }
  return currentWidth / defaultWidth;
}

export function scaleCoordinates(
  x: number,
  y: number,
  scaleFactor: number,
  cardWidth: number = DEFAULT_CARD_WIDTH,
  cardHeight: number = DEFAULT_CARD_HEIGHT
): ScaledCoordinates {
  return {
    x: x * scaleFactor,
    y: y * scaleFactor,
    width: cardWidth * scaleFactor,
    height: cardHeight * scaleFactor,
  };
}

export function normalizeCoordinates(
  scaledX: number,
  scaledY: number,
  scaleFactor: number
): { x: number; y: number } {
  if (scaleFactor === 1) {
    return { x: scaledX, y: scaledY };
  }
  return {
    x: scaledX / scaleFactor,
    y: scaledY / scaleFactor,
  };
}

export function prepareCardsWithScale(
  cards: Array<{ id: string; imgSrc: string; x: number; y: number; isFaceUp: boolean }>,
  scaleFactor: number
): CardWithScaledCoords[] {
  return cards.map(card => {
    const scaled = scaleCoordinates(card.x, card.y, scaleFactor);
    return {
      ...card,
      scaledX: scaled.x,
      scaledY: scaled.y,
      scaledWidth: scaled.width,
      scaledHeight: scaled.height,
    };
  });
}
