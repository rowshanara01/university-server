import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

// eta 1ta type definition file.
// express er namespace e user k dilam. validate purpose used