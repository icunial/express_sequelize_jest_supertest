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
  name: "Name 1",
  email: "name1@email.com",
  age: 25,
  phone: "1234567890",
};

const id = 1;
const updateUserInfo = { id: 1, name: "New Name" };

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
    const user = {
      id: 2,
      email: "name2@email.com",
      age: 30,
      phone: "1234567890",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Name parameter is missing");
  });
  it("Should return a 400 status code -> name parameter must be a string!", async () => {
    const user = {
      id: 2,
      name: 1234,
      email: "name2@email.com",
      age: 30,
      phone: "1234567890",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Name must be a string!");
  });
  it("Should return a 400 status code -> email parameter is missing", async () => {
    const user = {
      id: 2,
      name: "Name 2",
      age: 30,
      phone: "1234567890",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Email parameter is missing");
  });
  it("Should return a 400 status code -> email parameter must be a string!", async () => {
    const user = {
      id: 2,
      name: "Name 2",
      email: 1234,
      age: 30,
      phone: "1234567890",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Email must be a string!");
  });
  it("Should return a 400 status code -> age parameter is missing", async () => {
    const user = {
      id: 2,
      name: "Name 2",
      email: "name2@email.com",
      phone: "1234567890",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Age parameter is missing");
  });
  it("Should return a 400 status code -> age parameter must be a number", async () => {
    const user = {
      id: 2,
      name: "Name 2",
      email: "name2@email.com",
      age: "hello",
      phone: "1234567890",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Age must be a number!");
  });
  it("Should return a 400 status code -> age parameter must be between 1 and 100", async () => {
    const user = {
      id: 2,
      name: "Name 2",
      email: "name2@email.com",
      age: 101,
      phone: "1234567890",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Age must be between 1 and 100");
  });
  it("Should return a 400 status code -> phone parameter is missing", async () => {
    const user = {
      id: 2,
      name: "Name 2",
      email: "name2@email.com",
      age: 25,
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Phone parameter is missing!");
  });
  it("Should return a 400 status code -> phone parameter must be a string", async () => {
    const user = {
      id: 2,
      name: "Name 2",
      email: "name2@email.com",
      age: 25,
      phone: 124567890,
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Phone must be a string!");
  });
  it("Should return a 400 status code -> phone parameter must contain 10 numbers", async () => {
    const user = {
      id: 2,
      name: "Name 2",
      email: "name2@email.com",
      age: 25,
      phone: "123456789",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Phone must contain 10 numbers");
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

describe("Create a new user", () => {
  it("Create a user", async () => {
    const user = {
      id: 2,
      name: "Name 2",
      email: "name2@email.com",
      age: 30,
      phone: "1234567890",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(201);
  });
  it("Data length response must be 2", async () => {
    const response = await request(app).get("/users");
    expect(response.body.data.length).toBe(2);
  });
});

describe("Find User by id", () => {
  it("it should return 200 status code -> User exists", async () => {
    const response = await request(app).get("/users/1");
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].name).toBe("Name 1");
  });
  it("it should return 200 status code -> User exists", async () => {
    const response = await request(app).get("/users/2");
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].name).toBe("Name 2");
  });
});

describe("Update User by id", () => {
  it("it should return 200 status code -> User Updated", async () => {
    const data = {
      name: "New Name",
    };
    const response = await request(app).put("/users/1").send(data);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].name).toBe("New Name");
  });
});
