const { app, request, db, seed, data } = require("../testIndex");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET api/topics", () => {
  test("should return 404, with message indicating the route is not found", () => {
    return request(app)
      .get("/api/bad-route")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ROUTE NOT FOUND");
      });
  });

  test("should return a 200 status code, indicating the endpoint is accessible", () => {
    return request(app).get("/api/topics").expect(200);
  });

  test("should return the correct length of topics in body", async () => {
    const expectedLength = (await db.query(`SELECT * from topics`)).rows.length;
    return request(app)
      .get("/api/topics")
      .then(({ body }) => {
        expect(body.length).toBe(expectedLength);
      });
  });

  test("should return a list of topics, each containing a description and a slug", () => {
    return request(app)
      .get("/api/topics")
      .then(({ body }) => {
        body.forEach((currentObj) => {
          expect(currentObj).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
});
