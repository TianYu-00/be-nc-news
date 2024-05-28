const { app, request, db, seed, data } = require("../testIndex");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api/articles/:article_id", () => {
  test("should return 404, with message indicating the route is not found", () => {
    return request(app)
      .get("/api/article/1")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ROUTE NOT FOUND");
      });
  });

  test("should return a 200 status code, indicating the endpoint is accessible", () => {
    return request(app).get("/api/articles/1").expect(200);
  });

  test("should contain the correct properties", async () => {
    return request(app)
      .get("/api/articles/1")
      .then(({ body }) => {
        body.created_at = new Date(body.created_at);
        expect(body).toMatchObject({
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(Date),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });

  test("should send an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article does not exist");
      });
  });

  test("should send an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/not-an-article")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("BAD REQUEST");
      });
  });
});
