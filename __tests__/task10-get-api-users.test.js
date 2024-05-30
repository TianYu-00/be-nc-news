const { app, request, db, seed, data } = require("../testIndex");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api/users", () => {
  test("should respond back as an array", () => {
    return request(app)
      .get("/api/users")
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
      });
  });

  test("should get all users and their correct properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((users) => {
        console.log(users.body);
        users.body.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });

  test("should return the correct length of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((users) => {
        expect(users.body).toHaveLength(4);
      });
  });

  test("should return 404, with message indicating the route is not found", () => {
    return request(app)
      .get("/api/bad-route")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ROUTE NOT FOUND");
      });
  });
});
