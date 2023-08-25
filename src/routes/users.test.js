const request = require("supertest");
const app = require("../../index");

const db = require("../db");
const User = require("../models/User");

beforeAll(async () => {
  await db.sync({ force: true });
});

afterAll((done) => {
  db.close();
  done();
});

const user = {
  id: 1,
  name: "userNew5",
  email: "user5@gmail.com",
  age: 25,
  phone: "1234567890",
};

const id = 1;
const updateUserInfo = { id: 1, name: "user5" };

describe("Database Empty", () => {
  it("it should return a 404 status code -> Database is empty!", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(404);
    expect(response.body.msg).toBeTruthy();
  });
});

describe("POST / route", () => {
  it("Create a user", async () => {
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(201);
  });
  it("Should return a 400 status code -> name parameter is missing", async () => {
    const response = await request(app).post("/users").send({
      id: 2,
      email: "user5@gmail.com",
      age: 25,
      phone: "1234567890",
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Name parameter is missing");
  });
});

describe("Database is not empy", () => {
  it("it should return 200 status code -> Database is not empty!", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
  });
  it("Data length reponse must be 1", async () => {
    const response = await request(app).get("/users");
    expect(response.body.data.length).toBe(1);
  });
});

describe("Find User by id", () => {
  it("it should return 200 status code -> User exists", async () => {
    const response = await request(app).get("/users/1");
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].name).toBe("userNew5");
  });
});
