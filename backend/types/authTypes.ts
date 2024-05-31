import { Request } from "express";
import { Document } from "mongoose";

export interface UserSchemaType extends Document {
  username: string;
  email: string;
  password: string;
  confirmPassword: string | undefined;
  createdAt: Date;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

export interface userRequest extends Request {
  user?: UserSchemaType | null;
}
