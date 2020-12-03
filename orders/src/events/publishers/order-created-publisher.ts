import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@szumnarskicommerce/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
