import { v4 as uuidv4 } from 'uuid';
import { CrossTabClient, badge, badgeEn, log } from '@logux/client'
import { badgeStyles } from '@logux/client/badge/styles'

const userId = uuidv4();

export const client = new CrossTabClient({
  prefix: 'loguxTEST',
  server: 'ws://localhost:31337',
  subprotocol: "1.0.0",
  userId,  // TODO: We will fill it in Authentication recipe
  token: ''  // TODO: We will fill it in Authentication recipe
})

export const flipCard = ({ cardId, isFaceUp }: { cardId: string; isFaceUp: boolean }) => {
  console.log('client flip', cardId, isFaceUp);
  client.log.add({
    type: 'card/flip',
    cardId,
    isFaceUp,
    userId,
  });
};

export const moveCard = ({ cardId, x, y }: { cardId: string, x: number, y: number }) => {
  console.log({ cardId, x, y })
};

badge(client, { messages: badgeEn, styles: badgeStyles })
log(client)

client.start();

// Subscribe to global channel for real-time updates
// client.log.add({ type: 'logux/subscribe', channel: 'global' });
