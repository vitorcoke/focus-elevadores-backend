import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IModuleMessageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    const body = req.body;

    const validateHash = JSON.stringify(body).length * 34712;

    if (
      headers.authorization === `Bearer ${process.env.IMODULE_TOKEN}` &&
      headers.hash === validateHash.toString()
    ) {
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
