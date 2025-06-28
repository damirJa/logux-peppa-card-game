import { Server } from '@logux/server';
import { map } from 'nanostores';
import { v4 as uuidv4 } from 'uuid';

const $serverCards = map({});

const INITIAL_CARDS = [
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=240&h=320&fit=crop', x: 50, y: 50, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=240&h=320&fit=crop', x: 200, y: 50, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=240&h=320&fit=crop', x: 350, y: 50, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=240&h=320&fit=crop', x: 50, y: 250, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=240&h=320&fit=crop', x: 200, y: 250, isFaceUp: false },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=240&h=320&fit=crop', x: 350, y: 250, isFaceUp: false },
];

const cardsMap = {};
INITIAL_CARDS.forEach(card => {
  cardsMap[card.id] = card;
});
$serverCards.set(cardsMap);

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: '1.0.0',
    supports: '1.x',
    fileUrl: import.meta.url
  })
);

server.auth(() => true);

server.channel('global', {
  access: () => true,
  async load(ctx) {
    const cards = $serverCards.get();
    const cardsArray = Object.values(cards);
    return {
      type: 'cards/loaded',
      cards: cardsArray
    }
  }
})

server.type('card/flip', {
  access: () => true,
  process(ctx, action, meta) {
    const currentCards = $serverCards.get();
    const { cardId, isFaceUp } = action;

    if (currentCards[cardId]) {
      $serverCards.setKey(cardId, {
        ...currentCards[cardId],
        isFaceUp
      });
    }
  },
  resend(ctx, action, meta) {
    return 'global';
  },
});

// Handle card move actions
server.type('card/move', {
  access: () => true,
  process(ctx, action, meta) {
    const currentCards = $serverCards.get();
    const { cardId, x, y } = action;

    if (currentCards[cardId]) {
      // Update server state
      $serverCards.setKey(cardId, {
        ...currentCards[cardId],
        x,
        y
      });
    }
  },
  resend(ctx, action, meta) {
    return 'global';
  },
});

server.listen();
