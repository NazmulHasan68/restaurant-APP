import { MailtrapClient } from 'mailtrap'; // ES6 import

export const client = new MailtrapClient({
  token: process.env.API_TOKEN || "", // Fallback for missing token
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Nazmul Hasan",
};




// const { MailtrapClient } = require("mailtrap");

// export const client = new MailtrapClient({
//   token: process.env.API_TOKEN,
// });

// export const sender = {
//   email: "hello@demomailtrap.com",
//   name: "Nazmul hasan",
// };
