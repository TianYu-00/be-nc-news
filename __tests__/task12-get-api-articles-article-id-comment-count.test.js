const { app, request, db, seed, data } = require("../testIndex");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api/articles/:article_id (comment_count)", () => {
  test("should also now include comment_count", () => {
    return request(app)
      .get("/api/articles/1?comment_count")
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({ comment_count: expect.any(String) });
      });
  });

  test("should verify that the response contains the expected properties with correct data types", () => {
    return request(app)
      .get("/api/articles/1?comment_count")
      .expect(200)
      .then(({ body }) => {
        // console.log(body);
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
          comment_count: expect.any(String),
        });
      });
  });

  test("should receive the correct comment counts", () => {
    return request(app)
      .get("/api/articles/1?comment_count")
      .expect(200)
      .then(({ body }) => {
        expect(body.comment_count).toBe("11");
      });
  });

  test("should receive a BAD REQUEST error message if query key was not valid", () => {
    return request(app)
      .get("/api/articles/1?commentCounnnnt")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("BAD REQUEST");
      });
  });
});
