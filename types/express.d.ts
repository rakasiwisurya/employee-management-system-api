declare namespace Express {
  export interface Request {
    user?: any;
    fileValidationError?: string | object;
    file?: {
      path: string;
      filename: string;
      buffer: Buffer;
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
    };
  }
}
