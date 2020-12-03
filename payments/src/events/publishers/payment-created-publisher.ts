import {
  Publisher,
  PaymentCreatedEvent,
  Subjects,
} from "@szumnarskicommerce/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
