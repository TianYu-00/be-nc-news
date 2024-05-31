const { app, request, db, seed, data } = require("../testIndex");
require("jest-sorted");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("ADVANCED: GET /api/articles (sorting queries)", () => {
  describe("sort_by", () => {
    test("should respond back with sorted articles based on created_at when queried with sort_by, defaults to descending when not passed an order query", () => {
      return request(app)
        .get("/api/articles?sort_by")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("created_at", { descending: true });
        });
    });

    test("should respond back with sorted articles based on title when queried with sort_by=title, defaults to descending when not passed an order query", () => {
      return request(app)
        .get("/api/articles?sort_by=title")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("title", { descending: true });
        });
    });

    test("should respond back with sorted articles based on votes when queried with sort_by=votes, defaults to descending when not passed an order query", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("votes", { descending: true });
        });
    });

    test("should respond back with sorted articles based on author when queried with sort_by=author, defaults to descending when not passed an order query", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("author", { descending: true });
        });
    });
  });

  describe("ascending order", () => {
    test("should respond back with ascending sorted articles based on created_at when queried with sort_by&order=ASC", () => {
      return request(app)
        .get("/api/articles?sort_by&order=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("created_at", { descending: false });
        });
    });

    test("should respond back with ascending sorted articles based on title when queried with sort_by=title&order=ASC", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("title", { descending: false });
        });
    });

    test("should respond back with ascending sorted articles based on votes when queried with sort_by=votes&order=ASC", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("votes", { descending: false });
        });
    });

    test("should respond back with ascending sorted articles based on author when queried with sort_by=author&order=ASC", () => {
      return request(app)
        .get("/api/articles?sort_by=author&order=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("author", { descending: false });
        });
    });
  });

  describe("descending order", () => {
    test("should respond back with descending sorted articles based on created_at when queried with sort_by&order=DESC", () => {
      return request(app)
        .get("/api/articles?sort_by&order=DESC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("created_at", { descending: true });
        });
    });

    test("should respond back with descending sorted articles based on title when queried with sort_by=title&order=DESC", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order=DESC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("title", { descending: true });
        });
    });

    test("should respond back with descending sorted articles based on votes when queried with sort_by=votes&order=DESC", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order=DESC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("votes", { descending: true });
        });
    });

    test("should respond back with descending sorted articles based on author when queried with sort_by=author&order=DESC", () => {
      return request(app)
        .get("/api/articles?sort_by=author&order=DESC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("author", { descending: true });
        });
    });
  });

  describe("error handling", () => {
    test("should receive a BAD REQUEST error message if query key was not valid", () => {
      return request(app)
        .get("/api/articles?wrongquerykey")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("BAD REQUEST");
        });
    });

    test("should receive a BAD REQUEST error message if query value was not valid", () => {
      return request(app)
        .get("/api/articles?sort_by=invalidSortByValue")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("BAD REQUEST");
        });
    });
  });
});

describe("ADVANCED: GET /api/users/:username", () => {
  test("should return a user by username", () => {
    return request(app)
      .get("/api/users/lurker")
      .expect(200)
      .then(({ body }) => {
        body.created_at = new Date(body.created_at);
        expect(body).toMatchObject({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String),
        });
      });
  });

  test("should receive a NOT FOUND error message if username given was not in the database", () => {
    return request(app)
      .get("/api/users/Tian")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("NOT FOUND");
      });
  });
});

describe.only("ADVANCED: PATCH /api/comments/:comment_id", () => {
  test("should update the votes on a comment given the comment's comment_id", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: 100 })
      .expect(200)
      .then((result) => {
        expect(result.body.votes).toBe(116);
      });
  });

  test("should decrement the vote count of the specified article", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: -5 })
      .expect(200)
      .then((result) => {
        expect(result.body.votes).toBe(11);
      });
  });

  test("should return the comment object", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: 0 })
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        body.created_at = new Date(body.created_at);
        expect(body).toMatchObject({
          comment_id: expect.any(Number),
          body: expect.any(String),
          article_id: expect.any(Number),
          author: expect.any(String),
          votes: expect.any(Number),
          created_at: expect.any(Date),
        });
      });
  });

  test("should send an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .patch("/api/comments/999")
      .send({ inc_votes: 0 })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("comment does not exist");
      });
  });

  test("should send an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .patch("/api/comments/invalid-id")
      .send({ inc_votes: 0 })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("BAD REQUEST");
      });
  });
});
