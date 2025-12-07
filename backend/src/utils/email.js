import nodemailer from 'nodemailer';

const createTransporter = () => {
  if (!process.env.EMAIL_HOST) {
    // fallback: log to console (dev)
    return {
      sendMail: async (opts) => {
        console.log('--- Email (dev) ---');
        console.log(opts);
      }
    };
  }
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html,
    text
  });
  return info;
};

export { sendEmail };
