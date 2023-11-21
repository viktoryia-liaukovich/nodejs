import Joi from 'joi';
import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../../repositories/users.repository';

export const userBodySchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) //Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number
});

export async function registerUser(req: Request, res: Response) {
  const body = req.body;

  const data = userBodySchema.validate(body);

  if (data.error) {
    res.status(400).send(`User data is not valid: ${data.error.message}`);
    return;
  }

  const user = await getUserByEmail(data.value.email);

  if (user) {
    res.status(400).send(`User with email '${data.value.email}' is already exists!`);
    return;
  }

  const createdUser = await createUser(data.value.email, data.value.password);

  res.status(200).json(createdUser);
}