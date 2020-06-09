import { Publisher, Subjects, TicketUpdatedEvent } from '@gtickets/nats-common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  readonly subject = Subjects.TicketUpdated;
  
}