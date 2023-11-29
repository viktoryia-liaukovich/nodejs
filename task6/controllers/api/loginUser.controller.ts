import { Request, Response } from 'express';
import { getUserByEmail, updateUser } from '../../repositories/users.repository';
import { userBodySchema } from './registerUser.controller';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Log } from '../../utils/logger';

export async function loginUser(req: Request, res: Response) {
  const body = req.body;

  const data = userBodySchema.validate(body);

  Log(`Login attempt ${new Date().getTime()}`);

  if (data.error) {
    Log('User data is not valid');

    res.status(400).send(`User data is not valid: ${data.error.message}`);
    return;
  }

  const user = await getUserByEmail(data.value.email);

  if (!user) {
    Log(`Login attempt: user with provided email not found`);

    res.status(400).send(`User with email '${data.value.email}' does not exist!`);
    return;
  }

  const isPasswordMatches = bcrypt.compareSync(data.value.password, user.password);

  if (!isPasswordMatches) {
    Log(`Login attempt: user password does not match`);

    res.status(403).send('Incorrect password');
    return;
  }

  // JWT
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

  const jwtData = {
    time: new Date().getTime(),
    userId: user.id,
  }

  try {
    const token = jwt.sign(jwtData, jwtSecretKey);

    Log(`Token created successfully at ${jwtData.time}`);

    await updateUser(user.id, { accessToken: token });

    res.status(200).json({
      type: 'Bearer',
      accessToken: token,
      expiresIn: 7200
    });
  } catch(err: any) {
    Log(`Error creating token: ${err.message}`)
    res.status(500).send(err.message);
  }
}