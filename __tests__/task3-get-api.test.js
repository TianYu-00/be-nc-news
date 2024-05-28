const { app, request, db, seed, data } = require("../testIndex");
const fs = require("fs/promises");

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
    const endpointData = await fs.readFile("endpoints.json", "utf-8");
    return request(app)
      .get("/api")
      .then(({ text }) => {
        const expectedEndPointData = JSON.parse(endpointData);
        const resultEndPointData = JSON.parse(text);
        expect(Object.keys(resultEndPointData).length).toBe(Object.keys(expectedEndPointData).length);
      });
  });

  test("should return the accurate endpoint JSON object", async () => {
    const endpointData = await fs.readFile("endpoints.json", "utf-8");
    return request(app)
      .get("/api")
      .then(({ text }) => {
        expect(text).toBe(endpointData);
      });
  });
});
