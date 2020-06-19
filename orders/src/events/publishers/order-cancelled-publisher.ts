import { Publisher, OrderCancelledEvent, Subjects} from '@gtickets/nats-common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
  readonly subject = Subjects.OrderCancelled;
}