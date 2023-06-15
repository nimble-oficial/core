import { HttpException, HttpStatus } from "@nestjs/common";

export class HttpResponses extends HttpException {
  static parseSuccess<T>(data: T, status = HttpStatus.OK) {
    return {
      ok: true,
      error: null,
      message: null,
      data,
      status,
    };
  }

  static throwException(
    message: string | Error,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    throw new HttpException(
      {
        ok: false,
        error: true,
        message: message instanceof Error ? message.message : message,
        data: null,
        status,
      },
      status,
    );
  }
}
