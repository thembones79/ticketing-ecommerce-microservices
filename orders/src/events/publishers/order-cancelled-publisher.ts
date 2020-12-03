import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@szumnarskicommerce/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
