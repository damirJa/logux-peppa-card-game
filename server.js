import { Server } from '@logux/server';
import { map, atom } from 'nanostores';
import { v4 as uuidv4 } from 'uuid';

const $serverCards = map({});
const $flippedCards = atom([]);

const INITIAL_CARDS = [
  { id: uuidv4(), imgSrc: '/peppa.png', x: 20, y: 20, isFaceUp: false, found: false, character: 'Peppa Pig' },
  { id: uuidv4(), imgSrc: '/george.png', x: 164, y: 20, isFaceUp: false, found: false, character: 'George Pig' },
  { id: uuidv4(), imgSrc: '/daddy.png', x: 308, y: 20, isFaceUp: false, found: false, character: 'Daddy Pig' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=120&h=160&fit=crop', x: 452, y: 20, isFaceUp: false, found: false, character: 'Mummy Pig' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=120&h=160&fit=crop', x: 596, y: 20, isFaceUp: false, found: false, character: 'Grandpa Pig' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=120&h=160&fit=crop', x: 740, y: 20, isFaceUp: false, found: false, character: 'Granny Pig' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 20, y: 220, isFaceUp: false, found: false, character: 'Pedro Pony' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=120&h=160&fit=crop', x: 164, y: 220, isFaceUp: false, found: false, character: 'Suzy Sheep' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&h=160&fit=crop', x: 308, y: 220, isFaceUp: false, found: false, character: 'Rebecca Rabbit' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=120&h=160&fit=crop', x: 452, y: 220, isFaceUp: false, found: false, character: 'Candy Cat' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=120&h=160&fit=crop', x: 596, y: 220, isFaceUp: false, found: false, character: 'Danny Dog' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=120&h=160&fit=crop', x: 740, y: 220, isFaceUp: false, found: false, character: 'Zoe Zebra' },
  { id: uuidv4(), imgSrc: '/peppa.png', x: 20, y: 420, isFaceUp: false, found: false, character: 'Peppa Pig' },
  { id: uuidv4(), imgSrc: '/george.png', x: 164, y: 420, isFaceUp: false, found: false, character: 'George Pig' },
  { id: uuidv4(), imgSrc: '/daddy.png', x: 308, y: 420, isFaceUp: false, found: false, character: 'Daddy Pig' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=120&h=160&fit=crop', x: 452, y: 420, isFaceUp: false, found: false, character: 'Mummy Pig' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=120&h=160&fit=crop', x: 596, y: 420, isFaceUp: false, found: false, character: 'Grandpa Pig' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=120&h=160&fit=crop', x: 740, y: 420, isFaceUp: false, found: false, character: 'Granny Pig' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop', x: 20, y: 620, isFaceUp: false, found: false, character: 'Pedro Pony' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=120&h=160&fit=crop', x: 164, y: 620, isFaceUp: false, found: false, character: 'Suzy Sheep' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&h=160&fit=crop', x: 308, y: 620, isFaceUp: false, found: false, character: 'Rebecca Rabbit' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=120&h=160&fit=crop', x: 452, y: 620, isFaceUp: false, found: false, character: 'Candy Cat' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=120&h=160&fit=crop', x: 596, y: 620, isFaceUp: false, found: false, character: 'Danny Dog' },
  { id: uuidv4(), imgSrc: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=120&h=160&fit=crop', x: 740, y: 620, isFaceUp: false, found: false, character: 'Zoe Zebra' },
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
    host: '0.0.0.0',
    port: 31337,
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
  async process(ctx, action, meta) {
    const currentCards = $serverCards.get();
    const { cardId, isFaceUp } = action;

    if (!currentCards[cardId]) return;
    if (currentCards[cardId].found) return;

    // Update card state
    $serverCards.setKey(cardId, {
      ...currentCards[cardId],
      isFaceUp
    });

    // Track flipped cards
    if (isFaceUp) {
      const flippedCards = $flippedCards.get();
      const updatedCards = [...flippedCards, cardId];
      $flippedCards.set(updatedCards);

      const flippedCardIds = updatedCards;
      if (flippedCardIds.length === 2) {
        checkForMismatchedPairs(ctx, flippedCardIds);
      }
    } else {
      const flippedCards = $flippedCards.get();
      $flippedCards.set(flippedCards.filter(id => id !== cardId));
    }
  },
  resend(_, action) {
    const { cardId } = action;
    const currentCards = $serverCards.get();
    if (currentCards[cardId].found) return;
    return 'global';
  },
});

server.type('card/update', {
  access: () => true,
  process(_, action) {
    const { card } = action;
    $serverCards.setKey(card.id, card);
  },
  resend() {
    return 'global';
  },
});

async function checkForMismatchedPairs(ctx, flippedCardIds) {
  const currentCards = $serverCards.get();

  const card1 = currentCards[flippedCardIds[0]];
  const card2 = currentCards[flippedCardIds[1]];

  if (card1.character !== card2.character) {
    setTimeout(() => {
      ctx.server.process({
        type: 'card/flip',
        cardId: card1.id,
        isFaceUp: false
      });

      ctx.server.process({
        type: 'card/flip',
        cardId: card2.id,
        isFaceUp: false
      });
    }, 1000);

  } else {
    ctx.server.process({
      type: 'card/update',
      card: {
        ...card1,
        found: true
      }
    });
    ctx.server.process({
      type: 'card/update',
      card: {
        ...card2,
        found: true
      }
    });
    ctx.server.process({
      type: 'cards/match'
    });
  }
  $flippedCards.set([]);

}

// Handle card match actions
server.type('cards/match', {
  access: () => true,
  process() { },
  resend() {
    return 'global';
  }
});

// Handle card move actions
server.type('card/move', {
  access: () => true,
  process(ctx, action, meta) {
    const currentCards = $serverCards.get();
    const { cardId, x, y } = action;

    if (currentCards[cardId]) {
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
