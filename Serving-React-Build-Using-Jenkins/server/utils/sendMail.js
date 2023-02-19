import nodelmailer from "nodemailer";
import config from "config";

let {HOST, AUTH} = config.get("EMAIL_SMTP");

async function sendMail(emailData) {
    try {
        let transporter = nodelmailer.createTransport({

            host: HOST,
            port: 465,
            secure: true,
            auth: {
                user: AUTH["USER"],
                pass: AUTH["PASS"]
            }
        });


        let info = await transporter.sendMail({
            from: `"Library Management System" <${AUTH["USER"]}>`,
            subject: emailData.subject, // Subject line
            to: emailData.to,
            html: emailData.body
        });
        console.log(info.messageId);


    } catch (error) {
        console.log(error);
    }
}
export default sendMail;