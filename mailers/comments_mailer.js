const nodeMailer = require("../config/nodemailer");
const key = require('../config/keys');
//for sending the verification mail to the user
exports.newComment = (comment) => {
  let htmlString = nodeMailer.renderTemplate({comment:comment}, "comments_mailer.ejs");

  console.log("checking user verification");
//   console.log(comment);
  nodeMailer.transporter.sendMail(
    {
      from: key.gmail.user, // sender address
      to: comment.user.email, // list of receivers
      subject: 'Activity On Your Post ✔', // Subject line
      // text: "Hello world?", // plain text body
      html: htmlString, // html body
    },
    function (err, info) {
      if (err) {
        console.log('error while sending mail', err);
        return;
      }
      console.log('email send', info);
    }
  );
  return;
};
