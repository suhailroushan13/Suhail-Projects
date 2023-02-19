import jwt from "jsonwebtoken";
import cryptoJS from "crypto-js";
import config from "config";

const { JWT, CRYPTO } = config.get("SECRET_KEYS");

function generateToken(payload) {
  try {
    const token = jwt.sign(payload, JWT, { expiresIn: "1h" });
    let cipherToken = cryptoJS.AES.encrypt(token, CRYPTO).toString();
    return cipherToken;
  } catch (err) {
    return;
  }
}

export default generateToken;
