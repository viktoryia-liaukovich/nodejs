import { NextFunction, Request, Response } from "express";
import { getUserById } from "../repositories/users.repository";

export const isUserExists = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-user-id'];

  if (typeof userId === 'string' && await getUserById(userId)) {
    next();
  } else {
    res.status(404).send(`User with id '${userId || ''}' not found`)
  }
}