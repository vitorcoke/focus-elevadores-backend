const JWT_SECRET = process.env.JWT_SECRET_KEY || 'key not found';

export const jwtConstants = {
  secret: JWT_SECRET,
};
