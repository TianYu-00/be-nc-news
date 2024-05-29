const { app, request, db, seed, data } = require("../testIndex");
require("jest-sorted"); // https://www.npmjs.com/package/jest-sorted

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api/articles/:article_id/comments", () => {
  test("should return back as an array", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
      });
  });

  test("should return an error message when article does not have any comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("NOT FOUND");
      });
  });

  test("should return the correct key and data type for value", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        body.forEach((currentObj) => {
          currentObj.created_at = new Date(currentObj.created_at);
          expect(currentObj).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(Date),
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
          });
        });
      });
  });

  test("should return the correct length", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .then(({ body }) => {
        expect(body).toHaveLength(11);
      });
  });

  test("should be sorted in descending(most recent) order based on created_at", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .then(({ body }) => {
        expect(body).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("should receive status code of 404 when input article id is not found", () => {
    return request(app).get("/api/articles/9999/comments").expect(404);
  });

  test("should receive message when input article id is not found", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .then((response) => {
        expect(response.body.msg).toBe("NOT FOUND");
      });
  });

  test("should respond with an appropriate error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/invalid-id/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("BAD REQUEST");
      });
  });
});
