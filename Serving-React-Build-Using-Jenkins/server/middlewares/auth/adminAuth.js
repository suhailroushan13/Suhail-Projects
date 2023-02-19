import JWT from "jsonwebtoken";
import CryptoJS from "crypto-js";
import config from "config";

function adminAuth(req, res, next)
{
    try {

        let payload = CryptoJS.AES.decrypt(req.headers["x-auth-token"], config.get("SECRET_KEYS.CRYPTO"));
        payload = payload.toString(CryptoJS.enc.Utf8);
        payload = JWT.verify(payload, config.get("SECRET_KEYS.JWT"));
        req.payload = payload;
        return next();
    } catch (error) {
     //   console.log(error);
        return res.status(401).json({error : "Unauthorized access/ Token Expired !"});
    }
}

export default adminAuth;
