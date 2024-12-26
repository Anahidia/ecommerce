import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const date = new Date();

  const day = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  console.log(`se ejecuto el metodo ${req.method} 
en las rutas ${req.url} el dia ${day} a las ${time}`);

  next();
}
