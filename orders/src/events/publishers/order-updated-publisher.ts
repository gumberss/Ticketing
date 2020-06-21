import { Publisher, Subjects, OrderUpdatedEvent } from '@gtickets/nats-common'

export class OrderUpdatedPublisher extends Publisher<OrderUpdatedEvent>{
  readonly subject = Subjects.OrderUpdated;
  
}