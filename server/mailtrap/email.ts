import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";
import { client, sender } from "./mailtrap";

interface Recipient {
  email: string;
}

const sendEmail = async (
  to: Recipient[],
  subject: string,
  html: string,
  category: string,
  templateVariables?: Record<string, any>
): Promise<void> => {
  try {
    // Using the `send` method to send emails
    await client.send({
      from: sender,
      to,
      subject,
      html,
      category,
      ...(templateVariables && { templateVariables }),
    });
  } catch (error) {
    console.error(`Error sending email: ${subject}`, error);
    throw new Error(`Failed to send email: ${subject}`);
  }
};

// Send Verification Email
export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  const recipients = [{ email }];
  const html = htmlContent.replace("{verificationToken}", verificationToken);

  await sendEmail(recipients, "Verify your Email", html, "Email Verification");
};

// Send Welcome Email
export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<void> => {
  const recipients = [{ email }];
  const html = generateWelcomeEmailHtml(name);

  await sendEmail(recipients, "Welcome to FoodShadow", html, "Welcome Email", {
    company_info_name: "FoodShadow",
    name,
  });
};



// Send Password Reset Email
export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
): Promise<void> => {
  const recipients = [{ email }];
  const html = generatePasswordResetEmailHtml(resetURL);

  await sendEmail(recipients, "Reset your Password", html, "Reset Password");
};



// Send Password Reset Success Email
export const sendResetSuccessEmail = async (email: string): Promise<void> => {
  const recipients = [{ email }];
  const html = generateResetSuccessEmailHtml();

  await sendEmail(
    recipients,
    "Password Reset Successfully",
    html,
    "Password Reset Success"
  );
};





// import {
//     generatePasswordResetEmailHtml,
//     generateResetSuccessEmailHtml,
//     generateWelcomeEmailHtml,
//     htmlContent,
//   } from "./htmlEmail";
//   import { client, sender } from "./mailtrap";
  

//   interface Recipient {
//     email: string;
//   }

  
//   const sendEmail = async (
//     to: Recipient[],
//     subject: string,
//     html: string,
//     category: string,
//     templateVariables?: Record<string, any>
//   ): Promise<void> => {
//     try {
//       await client({
//         from: sender,
//         to,
//         subject,
//         html,
//         category,
//         ...(templateVariables && { TemplateVariables: templateVariables }),
//       });
//     } catch (error) {
//       console.error(`Error sending email: ${subject}`, error);
//       throw new Error(`Failed to send email: ${subject}`);
//     }
//   };
  
//   // Send Verification Email
//   export const sendVerificationEmail = async (
//     email: string,
//     verificationToken: string
//   ): Promise<void> => {
//     const recipients = [{ email }];
//     const html = htmlContent.replace("{verificationToken}", verificationToken);
  
//     await sendEmail(recipients, "Verify your Email", html, "Email Verification");
//   };
  
//   // Send Welcome Email
//   export const sendWelcomeEmail = async (
//     email: string,
//     name: string
//   ): Promise<void> => {
//     const recipients = [{ email }];
//     const html = generateWelcomeEmailHtml(name);
  
//     await sendEmail(recipients, "Welcome to FoodShadow", html, "Welcome Email", {
//       company_info_name: "FoodShadow",
//       name,
//     });
//   };
  
//   // Send Password Reset Email
//   export const sendPasswordResetEmail = async (
//     email: string,
//     resetURL: string
//   ): Promise<void> => {
//     const recipients = [{ email }];
//     const html = generatePasswordResetEmailHtml(resetURL);
  
//     await sendEmail(recipients, "Reset your Password", html, "Reset Password");
//   };
  
//   // Send Password Reset Success Email
//   export const sendResetSuccessEmail = async (email: string): Promise<void> => {
//     const recipients = [{ email }];
//     const html = generateResetSuccessEmailHtml();
  
//     await sendEmail(
//       recipients,
//       "Password Reset Successfully",
//       html,
//       "Password Reset Success"
//     );
//   };
  