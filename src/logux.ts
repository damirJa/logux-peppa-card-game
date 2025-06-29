import { v4 as uuidv4 } from 'uuid';
import { CrossTabClient, badge, badgeEn, log } from '@logux/client'
import { badgeStyles } from '@logux/client/badge/styles'
import { $cards, flipCard as flipCardStore, moveCard as moveCardStore } from './stores/cards';
import type { Card, CardFlipAction, CardMoveAction, CardsLoadedAction } from './types';

const userId = uuidv4();

export const client = new CrossTabClient({
  prefix: 'loguxTEST',
  server: 'ws://0.0.0.0:31337',
  subprotocol: "1.0.0",
  userId,
})

client.type<CardFlipAction>('card/flip', (action) => {
  flipCardStore(action.cardId, action.isFaceUp);
});

client.type<CardMoveAction>('card/move', (action) => {
  moveCardStore(action.cardId, action.x, action.y);
});

client.type<CardsLoadedAction>('cards/loaded', (action) => {
  const cardsMap: Record<string, Card> = {};
  action.cards.forEach((card: Card) => {
    cardsMap[card.id] = card;
  });
  $cards.set(cardsMap);
});

export const flipCard = ({ cardId, isFaceUp }: { cardId: string; isFaceUp: boolean }) => {
  client.log.add({
    type: 'card/flip',
    cardId,
    isFaceUp,
    userId,
  }, { sync: true });
};

export const moveCard = ({ cardId, x, y }: { cardId: string, x: number, y: number }) => {
  client.log.add({
    type: 'card/move',
    cardId,
    x,
    y,
    userId,
  }, { sync: true });
};

badge(client, { messages: badgeEn, styles: badgeStyles })
log(client)

client.start();

client.log.add({ type: 'logux/subscribe', channel: `global` }, { sync: true });
