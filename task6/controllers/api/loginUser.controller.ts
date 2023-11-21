import { Request, Response } from 'express';
import { getUserByEmail, updateUser } from '../../repositories/users.repository';
import { userBodySchema } from './registerUser.controller';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function loginUser(req: Request, res: Response) {
  const body = req.body;

  const data = userBodySchema.validate(body);

  if (data.error) {
    res.status(400).send(`User data is not valid: ${data.error.message}`);
    return;
  }

  const user = await getUserByEmail(data.value.email);

  if (!user) {
    res.status(400).send(`User with email '${data.value.email}' does not exist!`);
    return;
  }

  const isPasswordMatches = bcrypt.compareSync(data.value.password, user.password);

  if (!isPasswordMatches) {
    res.status(403).send('Incorrect password');
    return;
  }

  // JWT
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

  const jwtData = {
    time: new Date().getTime(),
    userId: user.id,
  }

  const token = jwt.sign(jwtData, jwtSecretKey);

  await updateUser(user.id, { accessToken: token });

  res.status(200).json({
    type: 'Bearer',
    accessToken: token,
    expiresIn: 7200
  });
}