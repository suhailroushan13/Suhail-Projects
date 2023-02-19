import jwt from "jsonwebtoken";
import cryptoJS from "crypto-js";
import config from "config";

const { JWT, CRYPTO } = config.get("SECRET_KEYS");

function authMiddleware(req, res, next) {
  try {
    let token = req.headers["x-auth-token"];
    let bytes = cryptoJS.AES.decrypt(token, CRYPTO); // decrypting token
    let originalToken = bytes.toString(cryptoJS.enc.Utf8); // original token
    const payload = jwt.verify(originalToken, JWT); // decoding token & getting payload
    req.payload = payload;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Access Denied. Invalid Token/Token Expired" });
  }
}

export default authMiddleware;
