import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import {
  ExpirationCompleteEvent,
  OrderStatus,
} from "@szumnarskicommerce/common";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { Order } from "../../../models/order";

const setup = async () => {
  // create an instance of the listener
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  // create and save a ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 10,
  });
  await ticket.save();

  // create and save an order
  const order = Order.build({
    status: OrderStatus.Created,
    userId: "jhhjhjhj",
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  // create a fake data object
  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id,
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  // return all of this stuff
  return { listener, data, msg, ticket, order };
};

it("updated the order status to cancelled", async () => {
  const { listener, data, msg, ticket, order } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emit an OrderCancelled event", async () => {
  const { listener, data, msg, ticket, order } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  expect(eventData.id).toEqual(order.id);
});

it("ack the message", async () => {
  const { listener, data, msg, ticket, order } = await setup();

  try {
    await listener.onMessage(data, msg);
  } catch (error) {}
  expect(msg.ack).toHaveBeenCalled();
});
