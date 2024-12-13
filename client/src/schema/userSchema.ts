import {z} from 'zod'

export const userSignupSchema = z.object({
    fullname:z.string().min(3, "Full name is required"),
    email : z.string().email("Invalid email address"),
    password:z.string().min(4, "Password must be at least 4 characters."),
    contact:z.string().min(10, "contact number must be 10 digit")
})
export type SignupInputState = z.infer<typeof userSignupSchema>


export const userLoginSchema = z.object({
    email : z.string().email("Invalid email address"),
    password:z.string().min(4, "Password must be at least 4 characters."),
})
export type LoginInputState = z.infer<typeof userLoginSchema>