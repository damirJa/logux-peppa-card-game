import { useEffect, useState } from 'react';

interface CursorProps {
  x: number;
  y: number;
  userId: string;
  scaleFactor: number;
}

export const Cursor = ({ x, y, userId, scaleFactor }: CursorProps) => {
  const [visible, setVisible] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setVisible(true);
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    const newTimeoutId = setTimeout(() => {
      setVisible(false);
    }, 3000);
    
    setTimeoutId(newTimeoutId);
    
    return () => {
      if (newTimeoutId) {
        clearTimeout(newTimeoutId);
      }
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <div
      className="absolute pointer-events-none z-50 transition-opacity duration-300"
      style={{
        left: x * scaleFactor,
        top: y * scaleFactor,
        transform: 'translate(-2px, -2px)'
      }}
    >
      <img
        src="/mouse.png"
        alt={`Cursor of ${userId}`}
        className="w-6 h-6"
      />
      <div className="absolute top-6 left-0 bg-black/75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {userId.slice(0, 8)}
      </div>
    </div>
  );
};