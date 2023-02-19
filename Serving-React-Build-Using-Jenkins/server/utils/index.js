import sendMail from "./sendMail.js";

function randomString(length) {
    let chars = "ABCDEF23456GHIJKLMNfghijklmnopqrstuvwxOPQRSTUVWXYZabcdeyz01789";
    let token = ""
    for (let i = 0; i < length; i++) {
        token += chars[Math.floor(Math.random() * (chars.length - 1))];
    }
    return token;
}

export { randomString, sendMail };