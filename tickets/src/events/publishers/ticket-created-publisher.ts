import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@szumnarskicommerce/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
