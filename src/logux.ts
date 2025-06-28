import { v4 as uuidv4 } from 'uuid';
import { CrossTabClient, badge, badgeEn, log } from '@logux/client'
import { badgeStyles } from '@logux/client/badge/styles'

const userId = uuidv4();

export const client = new CrossTabClient({
  prefix: 'loguxTEST',
  server: 'ws://localhost:31337',
  subprotocol: "1.0.0",
  userId,
})

export const flipCard = ({ cardId, isFaceUp }: { cardId: string; isFaceUp: boolean }) => {
  client.log.add({
    type: 'card/flip',
    cardId,
    isFaceUp,
    userId,
  });
};

export const moveCard = ({ cardId, x, y }: { cardId: string, x: number, y: number }) => {
  client.log.add({
    type: 'card/move',
    cardId,
    x,
    y,
    userId,
  });

};

badge(client, { messages: badgeEn, styles: badgeStyles })
log(client)

client.start();

client.log.add({ type: 'logux/subscribe', channel: 'global' });
