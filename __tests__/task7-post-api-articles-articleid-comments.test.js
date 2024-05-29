const { app, request, db, seed, data } = require("../testIndex");
require("jest-sorted"); // https://www.npmjs.com/package/jest-sorted

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("POST /api/articles/:article_id/comments", () => {
  const tempComment = {
    username: "icellusedkars",
    body: "Hello World!",
  };

  test("should return posted comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send(tempComment)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.comment).toBe("Hello World!");
      });
  });

  test("should receive message when input article id is not found", () => {
    return request(app)
      .post("/api/articles/9999/comments")
      .send(tempComment)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("NOT FOUND");
      });
  });

  test("should receive message when input article id is invalid", () => {
    return request(app)
      .post("/api/articles/invalid-id/comments")
      .send(tempComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("BAD REQUEST");
      });
  });

  test("should receive error message when username is missing", () => {
    const tempMissingUsernameComment = {
      body: "Hello World!",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(tempMissingUsernameComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("BAD REQUEST");
      });
  });

  test("should receive error message when body is missing", () => {
    const tempMissingBodyComment = {
      username: "icellusedkars",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(tempMissingBodyComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("BAD REQUEST");
      });
  });

  test("should receive error message when username is not found", () => {
    const tempNotFoundUserNameComment = {
      username: "Tian",
      body: "Hello World!",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(tempNotFoundUserNameComment)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("NOT FOUND");
      });
  });
});
