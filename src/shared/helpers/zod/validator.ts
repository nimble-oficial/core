import * as z from "zod";
import { HttpException } from "../../exceptions";

export class Zod {
  static parseAndValidate<T, U>(schema: z.ZodType<T>, data: U): T {
    try {
      return schema.parse(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new HttpException(err.issues[0].message, 400);
      }
    }
  }
}
