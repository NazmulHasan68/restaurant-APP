import React, { FormEvent, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Contact, Loader2, LockKeyhole, Mail, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const { signup, loading } = useUserStore();

  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState<Partial<SignupInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Form validation
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }

    // Signup API call
    await signup(input);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full md:max-w-md md:border md:border-gray-200 rounded-lg mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">FoodShadow</h1>
        </div>

        {[
          { id: "fullname", type: "text", placeholder: "Full name", icon: User },
          { id: "email", type: "email", placeholder: "Email", icon: Mail },
          { id: "password", type: "password", placeholder: "Password", icon: LockKeyhole },
          { id: "contact", type: "text", placeholder: "Contact", icon: Phone },
          
        ].map(({ id, type, placeholder, icon: Icon }) => (
          <div className="mb-4" key={id}>
            <div className="relative">
              <label htmlFor={id} className="sr-only">
                {placeholder}
              </label>
              <Input
                id={id}
                type={type}
                name={id}
                value={input[id as keyof SignupInputState] || ""}
                onChange={changeEventHandler}
                placeholder={placeholder}
                className="pl-10 focus:outline-none"
              />
              <Icon className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors[id as keyof SignupInputState] && (
                <span className="text-xs text-red-500">
                  {errors[id as keyof SignupInputState]}
                </span>
              )}
            </div>
          </div>
        ))}

        <div className="mb-4">
          <Button
            type="submit"
            className={`w-full ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-orange hover:bg-hoverOrange"
            }`}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              "Signup"
            )}
          </Button>
        </div>
        <Separator />
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;




















// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
// import { useUserStore } from "@/store/useUserStore";
// import { Contact, Loader2, LockKeyhole, Mail, Phone, User } from "lucide-react";
// import React, { FormEvent, useState } from "react";
// import { Link } from "react-router-dom";



// const Signup = () => {

//   const {singup, loading} = useUserStore()

//     const [input, setinput] = useState<SignupInputState>({
//         fullname: '',
//         email : "",
//         password : "",
//         contact: ""
//     })
//     const [errors, seterrors] = useState<Partial<SignupInputState>>({})
//     const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) =>{
//         const {name , value} = e.target;
//         setinput({...input, [name]:value})
//     }
//     const loginSubmitHandler = async(e:FormEvent)=>{
//         e.preventDefault()
//         //from validation check start
//         const result = userSignupSchema.safeParse(input)
//         if(!result.success){
//             const fieldErrors = result.error.formErrors.fieldErrors;
//             seterrors(fieldErrors as Partial<SignupInputState>)
//             return
//         } 

//         // singup api implementation start here
//         await singup(input)

//     }

//   return (
//     <div className="flex items-center justify-center min-h-screen w-full">
//       <form onSubmit={loginSubmitHandler} className="md:p-8 w-full md:max-w-md md:border md:border-gray-200 rounded-lg mx-4">
//         <div className="mb-4">
//           <h1 className="font-bold text-2xl">FoodShadow</h1>
//         </div>

//         <div className="mb-4">
//           <div className="relative">
//             <label htmlFor="fullname" className="sr-only">Full name</label>
//             <Input
//               id="fullname"
//               type="text"
//               name='fullname'
//               value={input.fullname}
//               onChange={changeEventHandler}
//               placeholder="Full name"
//               className="pl-10 focus:outline-none"
//             />
//             <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
//             {errors && <span className="text-sm text-red-500">{errors.fullname}</span>}
//           </div>
//         </div>

//         <div className="mb-4">
//           <div className="relative">
//             <label htmlFor="email" className="sr-only">Email</label>
//             <Input
//               id="email"
//               type="email"
//               name='email'
//               value={input.email}
//               onChange={changeEventHandler}
//               placeholder="Email"
//               className="pl-10 focus:outline-none"
//             />
//             <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
//             {errors && <span className="text-xs text-red-500">{errors.email}</span>}
//           </div>
//         </div>
//         <div className="mb-4">
//           <div className="relative">
//             <label htmlFor="password" className="sr-only">Password</label>
//             <Input
//               id="password"
//               type="password"
//               name="password"
//               value={input.password}
//               onChange={changeEventHandler}
//               placeholder="Password"
//               className="pl-10 focus:outline-none"
//             />
//             <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
//             {errors && <span className="text-xs text-red-500">{errors.password}</span>}
//           </div>
//         </div>

//         <div className="mb-4">
//           <div className="relative">
//             <label htmlFor="email" className="sr-only">Contact</label>
//             <Input
//               id="contact"
//               type="text"
//               name='contact'
//               value={input.contact}
//               onChange={changeEventHandler}
//               placeholder="Contact"
//               className="pl-10 focus:outline-none"
//             />
//             <Phone className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
//             {errors && <span className="text-xs text-red-500">{errors.contact}</span>}
//           </div>
//         </div>

//         <div className="mb-4">
//           <Button
//             type="submit"
//             className={`w-full ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange hover:bg-hoverOrange'}`}
//             disabled={loading}
//           >
//             {loading ? (
//               <Loader2 className="mr-1 h-4 w-4 animate-spin" />
//             ) : (
//               "Signup"
//             )}
//           </Button>
//         </div>
//         <Separator />
//         <p className=" mt-2">
//           ALready have an account?{" "}
//           <Link to="/login" className="text-blue-500 hover:underline">
//             login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;
