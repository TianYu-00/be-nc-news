const { app, request, db, seed, data } = require("../testIndex");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api/articles (topic query)", () => {
  test("should respond back as an array", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
      });
  });

  test('should accept "topic" as a query', () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body }) => {
        body.forEach((currentObj) => {
          expect(currentObj.topic).toBe("cats");
        });
      });
  });

  test("should verify that the response contains the expected properties with correct data types", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .then(({ body }) => {
        body.forEach((currentObj) => {
          currentObj.created_at = new Date(currentObj.created_at);
          expect(currentObj).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(Date),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });

  test("should receive the correct length of array", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(1);
      });
  });

  test("should receive a BAD REQUEST error message if query key was not valid", () => {
    return request(app)
      .get("/api/articles?bad=query")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("BAD REQUEST");
      });
  });

  test("should receive a BAD REQUEST error message if not all query keys are valid", () => {
    return request(app)
      .get("/api/articles?topic=cats&bad=query")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("BAD REQUEST");
      });
  });

  test("should receive a NOT FOUND error message if query value is not found", () => {
    return request(app)
      .get("/api/articles?topic=randomQueryValue")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("NOT FOUND");
      });
  });
});
