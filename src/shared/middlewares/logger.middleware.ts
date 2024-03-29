import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl: url } = request;
    const userAgent = request.get("user-agent") || "";

    response.on("close", () => {
      const { statusCode } = response;

      this.logger.log(
        `Logging HTTP request ${method} ${url} ${statusCode} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
