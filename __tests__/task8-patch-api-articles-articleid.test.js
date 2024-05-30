const { app, request, db, seed, data } = require("../testIndex");
require("jest-sorted"); // https://www.npmjs.com/package/jest-sorted

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("PATCH /api/articles/:article_id", () => {
  test("should increment the vote count of the specified article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 100 })
      .expect(200)
      .then((result) => {
        // console.log(result.body);
        expect(result.body.votes).toBe(200);
      });
  });

  test("should decrement the vote count of the specified article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -50 })
      .expect(200)
      .then((result) => {
        expect(result.body.votes).toBe(50);
      });
  });

  test("should return the full article object", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 0 })
      .expect(200)
      .then(({ body }) => {
        body.created_at = new Date(body.created_at);
        expect(body).toMatchObject({
          article_id: expect.any(Number),
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
      .patch("/api/articles/999")
      .send({ inc_votes: 0 })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article does not exist");
      });
  });

  test("should send an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .patch("/api/articles/invalid-id")
      .send({ inc_votes: 0 })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("BAD REQUEST");
      });
  });
});
