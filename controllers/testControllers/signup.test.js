// const express = require("express");
// const request = require("supertest");

// const { signup } = require("../users");

// const app = express();

// app.post("/api/users/signup", signup);

// describe("test signup controller", () => {
//   beforeAll(() => {
//     app.listen(3000);
//   });

//   test("check status", async () => {
//     const response = await request(app).post("/api/users/signup");
//     console.log(response.status);
//     console.log((await response).status);
//     expect(response.status).toBe(500);
//   });
// });
