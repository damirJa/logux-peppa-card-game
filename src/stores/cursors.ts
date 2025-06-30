import { map } from 'nanostores';

export interface CursorPosition {
  x: number;
  y: number;
  userId: string;
  timestamp: number;
}

export const $cursors = map<Record<string, CursorPosition>>({});

export const updateCursor = (userId: string, x: number, y: number) => {
  $cursors.setKey(userId, {
    x,
    y,
    userId,
    timestamp: Date.now()
  });
};

export const removeCursor = (userId: string) => {
  const current = $cursors.get();
  const { [userId]: removed, ...rest } = current;
  $cursors.set(rest);
};