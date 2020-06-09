import { Publisher, Subjects, TicketCreatedEvent } from '@gtickets/nats-common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  readonly subject = Subjects.TicketCreated;
  
}