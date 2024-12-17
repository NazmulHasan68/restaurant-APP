
import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from './htmlEmail';
import {client, sender } from './mailtrap';

export const sendVerificationEmail = async(email:string, verificationToken:string) =>{
    const recipients = [{email}];

    try {
        const res = await client({
            from: sender,
            to: recipients,
            subject: "Verify your Email",
            html : htmlContent.replace("{verificationToken}", verificationToken),
            category: "Eamil Verification",
        })
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send email verification")
    }
      
   
}

export const sendWelcomeEmail = async(email:string, name:string)=>{
    const recipients = [{email}];
    const htmlContent = generateWelcomeEmailHtml(name)
    try {
        const res = await client({
            from: sender,
            to: recipients,
            subject: "Welcome to FoodShadow",
            html : htmlContent,
            TemplateVariables:{
                company_info_name : "FoodShadow",
                name : name
            }
        })
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email")
    }
}


export const sendPasswordResetEamil = async(email:string, resetURL:string) =>{
    const recipients = [{email}];
    const htmlContent = generatePasswordResetEmailHtml(resetURL)
    try {
        const res = await client({
            from: sender,
            to: recipients,
            subject: "Reset your password",
            html : htmlContent,
            category:"Reset Password"
        })
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to reset password")
    }
}



export const sendResetSuccessEamil = async(email:string) =>{
    const recipients = [{email}];
    const htmlContent = generateResetSuccessEmailHtml()
    try {
        const res = await client({
            from: sender,
            to: recipients,
            subject: "Password Reset successfully",
            html : htmlContent,
            category:"Password Reset "
        })
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send password reset success email")
    }
}