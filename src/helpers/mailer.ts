import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendMail = async ({email, emailType, userId }:any) => {
  try {
// create hashed token
const hashedToken =    bcryptjs.hash(userId.toString(),10);

// update user with token
if (emailType == "VERIFY") {
    await User.findByIdAndUpdate(userId, 
        { verifyToken: hashedToken,
            verifyTokenExpire: Date.now() + 3600000
         });

}
else if (emailType == "RESET") {
    await User.findByIdAndUpdate(userId,
        {  forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpire: Date.now() + 3600000
         });
}

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f5b8906d2a014f",
    pass: "537768b43b05c0"
  }
});
      const mailOptions = {
        from: "soumyadip@gmail.com",
        to: email,
        subject: emailType == "VERIFY" ? "Verify your Email" : "Reset your Password",
        html: `<p>click <a href="${process.env.DOMAIN}/verifyemail?token = ${hashedToken}">here</a> to ${emailType == "VERIFY" ? " verify your email" : "reset your password"}
        OR copy and paste the link below in your browser. 
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
}
const mailresponse = await transport.sendMail(mailOptions);
return mailresponse;
} catch (error:any) {
throw new Error(error.message);  
}
};
 