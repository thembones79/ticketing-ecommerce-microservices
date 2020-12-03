import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@szumnarskicommerce/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
