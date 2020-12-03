import { Message } from "node-nats-streaming";
import {
  Listener,
  OrderCancelledEvent,
  Subjects,
} from "@szumnarskicommerce/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket nor found");
    }

    // Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: undefined });

    // Save the ticket
    await ticket.save();
    const { id, price, title, userId, orderId, version } = ticket;
    await new TicketUpdatedPublisher(this.client).publish({
      id,
      price,
      title,
      userId,
      orderId,
      version,
    });

    // ack the message
    msg.ack();
  }
}
