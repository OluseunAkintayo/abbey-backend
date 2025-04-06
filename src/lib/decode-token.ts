import jsonwebtoken from 'jsonwebtoken';

const jwtKey = process.env.JWT_SECRET;

export const decodeToken = (token: string): { id: string } | null => {
  if(!jwtKey) return null;
  const decodedToken = jsonwebtoken.verify(token, jwtKey) as { id: string; email: string; exp: number; iat: number };
  return { id: decodedToken.id };
}
