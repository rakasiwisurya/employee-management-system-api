import bcrypt from "bcrypt";
import { Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";
import {
  responseBadRequest,
  responseInternalServerError,
  responseSuccess,
} from "../libs/response";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return responseBadRequest(res, error.details[0].message);

  try {
    await prisma.$transaction(async (prisma) => {
      const userData = await prisma.user.findFirst({
        select: {
          id: true,
          email: true,
          password: true,
        },
        where: { email },
      });

      if (!userData) {
        return responseBadRequest(res, "Email or password doesn't correct");
      }

      const isValid = await bcrypt.compare(password, userData.password);

      if (!isValid) {
        return responseBadRequest(res, "Email or password doesn't correct");
      }

      const { password: _, ...userDataWithoutPassword } = userData;

      const token = jwt.sign(
        {
          data: userDataWithoutPassword,
        },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "6h",
        }
      );

      const data = {
        ...userDataWithoutPassword,
        token,
      };

      responseSuccess(res, "Login success", data);
    });
  } catch (error) {
    responseInternalServerError(res, error);
  }
};
