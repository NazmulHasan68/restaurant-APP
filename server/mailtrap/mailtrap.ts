const { MailtrapClient } = require("mailtrap");

export const client = new MailtrapClient({
  token: process.env.API_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Nazmul hasan",
};
