import { Listener, TicketCreatedEvent, Subjects, TicketCreatedEventData } from "@gtickets/nats-common";
import { Message } from "node-nats-streaming";


export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
  readonly subject = Subjects.TicketCreated;
  
  queueGroupName: string = "orders-service"

  onMessage(data: TicketCreatedEventData, msg: Message): void {
      
  }
}