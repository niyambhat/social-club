const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFRESH);

const sendVerificationEmail = (email, name, uri) => {
  auth.setCredentials({ refresh_token: MAILING_REFRESH });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Social Media Verification",
    html: `<div style="font-family:Arial,sans-serif;background-color:#f4f4f4;margin:0;padding:0"><div style="max-width:600px;margin:20px auto;padding:20px;background-color:#fff;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,.1)"><h1 style="color:#333;margin-top:0">Email Verification</h1><p style="color:#777">Hello ${name},<br>Thank you for signing up for our social media app. To complete your registration, please verify your email address by entering the verification code below:</p><div style="background-color:#f8f8f8;padding:10px;border-radius:4px;font-weight:700" class="verification-code"></div><p style="color:#777">If you did not sign up for our app, please disregard this email.</p><a href="{url}" style="display:inline-block;background-color:#4caf50;color:#fff;text-decoration:none;padding:10px 20px;border-radius:4px;margin-top:20px" class="button">Verify Email</a></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

module.exports = { sendVerificationEmail };
