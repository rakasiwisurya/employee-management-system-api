import { Response } from "express";

export const responseInternalServerError = (res: Response, error: unknown) => {
  const err = error as Error;
  console.error(err);
  res.status(500).send({
    status: 500,
    message: err?.message,
    data: null,
  });
};

export const responseBadGateway = (
  res: Response,
  error: unknown,
  message?: string
) => {
  const err = error as Error;
  console.error(err);
  res.status(502).send({
    status: 502,
    message: message || err?.message,
    data: null,
  });
};

export const responseBadRequest = (res: Response, message: string) => {
  res.status(400).send({
    status: 400,
    message,
    data: null,
  });
};

export const responseUnauthorized = (res: Response) => {
  res.status(401).send({
    status: 401,
    message: "Unauthorized access",
    data: null,
  });
};

export const responseForbidden = (res: Response) => {
  res.status(403).send({
    status: 403,
    message: "Forbidden access",
  });
};

export const responseNotFound = (res: Response, message: string) => {
  res.status(404).send({
    status: 404,
    message,
    data: null,
  });
};

export const responseUnprocessableEntity = (res: Response, message: string) => {
  res.status(422).send({
    status: 422,
    message,
    data: null,
  });
};

export const responseSuccess = (
  res: Response,
  message: string,
  data: any | any[]
) => {
  res.status(200).send({
    status: 200,
    message,
    data,
  });
};
