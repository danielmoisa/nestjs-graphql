export interface JwtPayload {
    id: string;
    email: string;
    expiration?: Date;
  }