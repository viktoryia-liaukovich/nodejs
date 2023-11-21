import { NextFunction, Request, Response } from "express";
import { getUserById } from "../repositories/users.repository";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const isTokenValid = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization as string;

  if (!auth) {
    res.status(401).send('Unauthorized');
    return;
  }

  const token = auth.replace('Bearer ', '');

  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

  const isValidJwt = jwt.verify(token, jwtSecretKey);
  const jwtData = jwt.decode(token) as JwtPayload;

  if (!isValidJwt || (new Date().getTime() - new Date(jwtData?.time).getTime() >= 7200 * 1000)) {
    res.status(401).send('Unauthorized');
    return;
  }

  const user = await getUserById(jwtData.userId);

  if (user) {
    req.headers['x-user-id'] = user.id;
    next();
  } else {
    res.status(404).send(`User with id '${jwtData.userId || ''}' not found`);
  }
}