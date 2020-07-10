const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const development = {
  name: "development",
  assetPath: "./assets",
  sessionCookieKey: "blahsomething",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "shakirckyt@gmail.com",
      pass: "Shakirck@1997",
    },
  },
  googleClientID:
    "1089396301805-effd8cnd0civeafgvnul10tc4pphbahf.apps.googleusercontent.com",
  googleClientSecret: "yYO_0rqE9SCrbBQR2e2Lm3Lh",
  googleCallbackURL: "http://localhost:8000/users/auth/google/callback",
  jwtSecretKey: "codeial",
  morgan:{
      mode:'dev',
      options:{stream:accessLogStream}
  }
};
const production = {
  name: "production",
  assetPath: process.env.CODEIAL_ASSETPATH,
  sessionCookieKey: "blahsomething",
  db: process.env.CODEIAL_DB_NAME,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL_DB_NAME,
      pass: process.env.CODEIAL_SMTP_PASS,
    },
  },
  googleClientID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.CODEIAL_GOOGLE_SECRET_KEY,
  googleCallbackURL: "http://localhost:8000/users/auth/google/callback",
  jwtSecretKey: process.env.CODEIAL_JWT_SECRET_KEY,
  morgan:{
    mode:'combined',
    options:{stream:accessLogStream}
}
};
module.exports = eval(process.env.CODEIAL_ENVIORNMENT)== undefined ? development : eval(process.env.CODEIAL_ENVIORNMENT);
