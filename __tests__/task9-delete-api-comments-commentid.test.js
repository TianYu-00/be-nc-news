const { app, request, db, seed, data } = require("../testIndex");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("DELETE /api/comments/:comment_id", () => {
  test("should delete the given comment by comment_id", () => {
    const commentIdToDelete = 9;
    return request(app)
      .delete(`/api/comments/${commentIdToDelete}`)
      .expect(204)
      .then(async () => {
        const comments = await db.query(`SELECT comment_id FROM comments WHERE comment_id = $1;`, [commentIdToDelete]);
        expect(comments.rows.length).toBe(0);
      });
  });

  test("should return error message if given comment id is valid but not found", () => {
    return request(app)
      .delete("/api/comments/999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("comment does not exist");
      });
  });

  test("should return error message if given comment id is invalid", () => {
    return request(app)
      .delete("/api/comments/invalid-id")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("BAD REQUEST");
      });
  });
});
