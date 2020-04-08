const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (email, name) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  await sgMail.send(msg);
};

const sendCancellationEmail = async (email, name) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Sorry to se you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  await sgMail.send(msg);
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
