import { Server } from '@logux/server';
import { map, atom } from 'nanostores';
import { v4 as uuidv4 } from 'uuid';

const $serverCards = map({});
const $flippedCards = atom([]);

const INITIAL_CARDS = [
  // Row 1
  { id: uuidv4(), imgSrc: '/peppa.webp', x: 20, y: 20, isFaceUp: false, found: false, character: 'Peppa Pig' },
  { id: uuidv4(), imgSrc: '/george.webp', x: 125, y: 20, isFaceUp: false, found: false, character: 'George Pig' },
  { id: uuidv4(), imgSrc: '/danny.webp', x: 230, y: 20, isFaceUp: false, found: false, character: 'Danny Dog' },
  { id: uuidv4(), imgSrc: '/suzy.webp', x: 335, y: 20, isFaceUp: false, found: false, character: 'Suzy Sheep' },
  { id: uuidv4(), imgSrc: '/rebecca.webp', x: 440, y: 20, isFaceUp: false, found: false, character: 'Rebecca Rabbit' },
  { id: uuidv4(), imgSrc: '/pedro.webp', x: 545, y: 20, isFaceUp: false, found: false, character: 'Pedro Pony' },
  { id: uuidv4(), imgSrc: '/zoe.webp', x: 650, y: 20, isFaceUp: false, found: false, character: 'Zoe Zebra' },
  { id: uuidv4(), imgSrc: '/wendy.webp', x: 755, y: 20, isFaceUp: false, found: false, character: 'Wendy Wolf' },

  // Row 2
  { id: uuidv4(), imgSrc: '/daddy.webp', x: 20, y: 170, isFaceUp: false, found: false, character: 'Daddy Pig' },
  { id: uuidv4(), imgSrc: '/mummy.webp', x: 125, y: 170, isFaceUp: false, found: false, character: 'Mummy Pig' },
  { id: uuidv4(), imgSrc: '/grandpa.webp', x: 230, y: 170, isFaceUp: false, found: false, character: 'Grandpa Pig' },
  { id: uuidv4(), imgSrc: '/granny.webp', x: 335, y: 170, isFaceUp: false, found: false, character: 'Granny Pig' },
  { id: uuidv4(), imgSrc: '/freddy.webp', x: 440, y: 170, isFaceUp: false, found: false, character: 'Freddy Fox' },
  { id: uuidv4(), imgSrc: '/candy.webp', x: 545, y: 170, isFaceUp: false, found: false, character: 'Candy Cat' },
  { id: uuidv4(), imgSrc: '/gazelle.webp', x: 650, y: 170, isFaceUp: false, found: false, character: 'Madame Gazelle' },
  { id: uuidv4(), imgSrc: '/mandy.webp', x: 755, y: 170, isFaceUp: false, found: false, character: 'Mandy Mouse' },

  // Row 3
  { id: uuidv4(), imgSrc: '/rebecca.webp', x: 20, y: 320, isFaceUp: false, found: false, character: 'Rebecca Rabbit' },
  { id: uuidv4(), imgSrc: '/suzy.webp', x: 125, y: 320, isFaceUp: false, found: false, character: 'Suzy Sheep' },
  { id: uuidv4(), imgSrc: '/daddy.webp', x: 230, y: 320, isFaceUp: false, found: false, character: 'Daddy Pig' },
  { id: uuidv4(), imgSrc: '/grandpa.webp', x: 335, y: 320, isFaceUp: false, found: false, character: 'Grandpa Pig' },
  { id: uuidv4(), imgSrc: '/peppa.webp', x: 440, y: 320, isFaceUp: false, found: false, character: 'Peppa Pig' },
  { id: uuidv4(), imgSrc: '/mandy.webp', x: 545, y: 320, isFaceUp: false, found: false, character: 'Mandy Mouse' },
  { id: uuidv4(), imgSrc: '/freddy.webp', x: 650, y: 320, isFaceUp: false, found: false, character: 'Freddy Fox' },
  { id: uuidv4(), imgSrc: '/danny.webp', x: 755, y: 320, isFaceUp: false, found: false, character: 'Danny Dog' },

  // Row 4
  { id: uuidv4(), imgSrc: '/mummy.webp', x: 20, y: 470, isFaceUp: false, found: false, character: 'Mummy Pig' },
  { id: uuidv4(), imgSrc: '/pedro.webp', x: 125, y: 470, isFaceUp: false, found: false, character: 'Pedro Pony' },
  { id: uuidv4(), imgSrc: '/granny.webp', x: 230, y: 470, isFaceUp: false, found: false, character: 'Granny Pig' },
  { id: uuidv4(), imgSrc: '/candy.webp', x: 335, y: 470, isFaceUp: false, found: false, character: 'Candy Cat' },
  { id: uuidv4(), imgSrc: '/zoe.webp', x: 440, y: 470, isFaceUp: false, found: false, character: 'Zoe Zebra' },
  { id: uuidv4(), imgSrc: '/george.webp', x: 545, y: 470, isFaceUp: false, found: false, character: 'George Pig' },
  { id: uuidv4(), imgSrc: '/wendy.webp', x: 650, y: 470, isFaceUp: false, found: false, character: 'Wendy Wolf' },
  { id: uuidv4(), imgSrc: '/gazelle.webp', x: 755, y: 470, isFaceUp: false, found: false, character: 'Madame Gazelle' },
];

const cardsMap = {};
INITIAL_CARDS.forEach(card => {
  cardsMap[card.id] = card;
});
$serverCards.set(cardsMap);

// Shuffle function to randomize card positions and reset game state
function shuffleCardPositions() {
  const currentCards = $serverCards.get();
  const cardsArray = Object.values(currentCards);

  // Extract all current positions
  const positions = cardsArray.map(card => ({ x: card.x, y: card.y }));

  // Fisher-Yates shuffle algorithm
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  // Update cards with shuffled positions and reset game state
  const updatedCards = {};
  cardsArray.forEach((card, index) => {
    updatedCards[card.id] = {
      ...card,
      x: positions[index].x,
      y: positions[index].y,
      isFaceUp: false,
      found: false,
    };
  });

  $serverCards.set(updatedCards);
  // Clear any flipped cards tracking
  $flippedCards.set([]);
  return updatedCards;
}

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

// Handle cursor move actions
server.type('cursor/move', {
  access: () => true,
  process() {
    // This action is just a signal to clients, no server storage needed
  },
  resend() {
    return 'global';
  }
});

server.type('cards/loaded', {
  access: () => true,
  process() {
  },
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

server.type('cards/shuffle', {
  access: () => true,
  process(ctx) {
    const shuffledCards = shuffleCardPositions();
    const cardsArray = Object.values(shuffledCards);
    ctx.server.process({
      type: 'cards/loaded',
      cards: cardsArray
    })
  },
});

server.listen();
