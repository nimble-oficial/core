import { HttpResponses } from ".";
import { getBaseErrorResponse, getBaseSuccessResponse } from "../mocks";

const sut = HttpResponses;

describe("HttpResponses", () => {
  describe("parseSuccess()", () => {
    it("should return a success response for data as string", () => {
      expect(sut.parseSuccess("foobar")).toMatchObject({
        ...getBaseSuccessResponse(),
        data: "foobar",
      });

      expect(sut.parseSuccess("fuzzbizz")).toMatchObject({
        ...getBaseSuccessResponse(),
        data: "fuzzbizz",
      });

      expect(sut.parseSuccess("lorem ipsum")).toMatchObject({
        ...getBaseSuccessResponse(),
        data: "lorem ipsum",
      });
    });

    it("should return a success response for data as null", () => {
      expect(sut.parseSuccess(null)).toMatchObject({
        ...getBaseSuccessResponse(),
        data: null,
      });
    });

    it("should return a success response for data as object", () => {
      expect(sut.parseSuccess({ foo: true })).toMatchObject({
        ...getBaseSuccessResponse(),
        data: { foo: true },
      });

      expect(sut.parseSuccess({ fizz: false })).toMatchObject({
        ...getBaseSuccessResponse(),
        data: { fizz: false },
      });

      expect(sut.parseSuccess({ user: { name: "foo" } })).toMatchObject({
        ...getBaseSuccessResponse(),
        data: { user: { name: "foo" } },
      });

      expect(
        sut.parseSuccess({ user: { name: "foo", username: "bla" } }),
      ).toMatchObject({
        ...getBaseSuccessResponse(),
        data: { user: { name: "foo", username: "bla" } },
      });
    });

    it("should return a success response for data as array", () => {
      expect(sut.parseSuccess([1, 2, 3, 4, 5])).toMatchObject({
        ...getBaseSuccessResponse(),
        data: [1, 2, 3, 4, 5],
      });

      expect(sut.parseSuccess([{ user: 1 }, { user: 2 }])).toMatchObject({
        ...getBaseSuccessResponse(),
        data: [{ user: 1 }, { user: 2 }],
      });

      expect(sut.parseSuccess(["1", "2", "3"])).toMatchObject({
        ...getBaseSuccessResponse(),
        data: ["1", "2", "3"],
      });
    });
  });

  describe("throwException()", () => {
    it("should return an error response as string", () => {
      try {
        sut.throwException("foobar", 500);
      } catch (err) {
        expect(err.response).toEqual({
          ...getBaseErrorResponse("foobar"),
          status: 500,
        });
      }

      try {
        sut.throwException("fuzzbizz", 500);
      } catch (err) {
        expect(err.response).toEqual({
          ...getBaseErrorResponse("fuzzbizz"),
          status: 500,
        });
      }

      try {
        sut.throwException("lorem ipsum", 500);
      } catch (err) {
        expect(err.response).toEqual({
          ...getBaseErrorResponse("lorem ipsum"),
          status: 500,
        });
      }
    });

    it("should return an error response as Error", () => {
      try {
        sut.throwException(new Error("foobar"));
      } catch (err) {
        expect(err.response).toEqual({
          ...getBaseErrorResponse("foobar"),
          status: 500,
        });
      }

      try {
        sut.throwException(new Error("fuzzbizz"));
      } catch (err) {
        expect(err.response).toEqual({
          ...getBaseErrorResponse("fuzzbizz"),
          status: 500,
        });
      }

      try {
        sut.throwException(new Error("lorem ipsum"));
      } catch (err) {
        expect(err.response).toEqual({
          ...getBaseErrorResponse("lorem ipsum"),
          status: 500,
        });
      }

      try {
        sut.throwException(new Error("api key not provided"));
      } catch (err) {
        expect(err.response).toEqual({
          ...getBaseErrorResponse("api key not provided"),
          status: 500,
        });
      }

      try {
        sut.throwException(new Error("token not provided"));
      } catch (err) {
        expect(err.response).toEqual({
          ...getBaseErrorResponse("token not provided"),
          status: 500,
        });
      }
    });
  });
});
