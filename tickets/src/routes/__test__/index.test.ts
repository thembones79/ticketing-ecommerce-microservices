import request from "supertest";

import { app } from "../../app";

const createTicket = () => {
  const title = "concert";
  const price = 20;

  const response = request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price });

  return response;
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const ticketResponse = await request(app)
    .get(`/api/tickets`)
    .send()
    .expect(200);

  expect(ticketResponse.body).toHaveLength(3);
});
