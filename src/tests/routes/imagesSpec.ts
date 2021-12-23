import supertest from "supertest";
import app from "../../server";

const request = supertest(app);
describe("Test endpoint ", () => {
  it("Gets the test endpoint ", async done => {
    const response = await request.get("/api/convert");
    expect(response.status).toBe(200);
    done();
  });
});
