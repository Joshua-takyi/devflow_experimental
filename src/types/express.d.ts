import { UserProps } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user: Pick<
        UserProps,
        | "id"
        | "email"
        | "firstName"
        | "lastName"
        | "phone"
        | "createdAt"
        | "updatedAt"
      >;
    }
  }
}
