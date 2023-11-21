import { NextFunction, Request, Response } from "express";
import { getUserById } from "../repositories/users.repository";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-user-id'] as string;

  const user = await getUserById(userId);

  if (user) {
    if (user?.role !== 'admin') {
      res.status(403).send('Forbidden');
      return;
    }
    next();
  } else {
    res.status(404).send(`User with id '${userId || ''}' not found`);
  }
}