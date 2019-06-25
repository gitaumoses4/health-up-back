import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;
const EXPIRY = process.env.TOKEN_EXPIRY || '360h';

export default class JWT {
  static generate({
    email, name, id, accountType
  }) {
    return jwt.sign({
      email, name, id, accountType
    }, JWT_SECRET,
    {
      expiresIn: EXPIRY,
      algorithm: 'HS256'
    });
  }

  static verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err);
        }
        resolve(decodedToken);
      });
    });
  }
}
