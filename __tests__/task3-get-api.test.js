const { app, request, db, seed, data } = require("../testIndex");
const fs = require("fs/promises");
const endpointsData = require("../endpoints.json");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api", () => {
  test("should return 404, with message indicating the route is not found", () => {
    return request(app)
      .get("/bad-route")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ROUTE NOT FOUND");
      });
  });

  test("should return a 200 status code, indicating the endpoint is accessible", () => {
    return request(app).get("/api").expect(200);
  });

  test("should return the correct endpoints length", async () => {
    return request(app)
      .get("/api")
      .then(({ text }) => {
        const expectedEndPointData = endpointsData;
        const resultEndPointData = JSON.parse(text);
        expect(Object.keys(resultEndPointData).length).toBe(Object.keys(expectedEndPointData).length);
      });
  });

  test("should return the accurate endpoint JSON object", async () => {
    return request(app)
      .get("/api")
      .then(({ text }) => {
        const parsedText = JSON.parse(text);
        expect(parsedText).toEqual(endpointsData);
      });
  });
});
