const request = require("supertest");
const app = require("../../index");

const user = {
  id: 5,
  name: "userNew5",
  email: "user5@gmail.com",
  age: 25,
  phone: "1234567890",
};

const id = 5;
const updateUserInfo = { id: 5, name: "user5" };

describe("GET / route", () => {
  it("get all users", async () => {
    const response = await request(app).get("/users");
    console.log(response);
    expect(response.status).toBe(200);
  });
});

describe("POST / route", () => {
  it("Create a user", async () => {
    const response = await request(app).post("/users").send(user);
    console.log("Response after creating a user: ", createUser);
    expect(createUser.status).toBe(201);
    console.log(createUser.body);
  });
});
