import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const SendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { email, message } = req.body;

        if (!email || !message) return res.json({ message: "Datas missing" });

        const transporter = nodemailer.createTransport({
            host: "mail.privateemail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL,
                pass: process.env.NEXT_PUBLIC_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: email,
            subject: "Testing nodemailer",
            text: message,
        };

        try {
            await transporter.sendMail(mailOptions);

            res.json({ message: "Email sended!" });
        } catch (e) {
            console.log(e);
            console.log("sendEmail() Error");
            res.json({ message: "Api error" });
        }
    }
};

export default SendEmail;
