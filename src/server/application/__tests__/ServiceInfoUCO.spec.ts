import { ServiceInfoUCO } from '../ServiceInfoUCO';

describe("Authorize Admin Page", () => {
  beforeAll(async () => { });

  afterEach(() => { });

  describe("GET /api/info", () => {
    test("should return 200 status code", async () => {
      await new ServiceInfoUCO()
        .GetInfo()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          expect(err).toBeNull();
        });
    });

  });
});
