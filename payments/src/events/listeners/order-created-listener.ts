import { Listener, OrderCreatedEvent, Subjects} from '@gtickets/nats-common'
import { queueGroupName} from './queue-group-name'
import { Message } from 'node-nats-streaming'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  queueGroupName: string
  onMessage(data: unknown, msg: Message): void {
    throw new Error("Method not implemented.")
  }
  readonly subject = Subjects.OrderCreated

}