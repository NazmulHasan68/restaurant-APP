import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";


// typescript me type define krne ka 2 type hotahe 


const Login = () => {
    const [input, setinput] = useState<LoginInputState>({
        email : "",
        password : ""
    })
    const [erros , setErros] = useState<Partial<LoginInputState>>({})
    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        const {name , value} = e.target;
        setinput({...input, [name]:value})
    }
    const loginSubmitHandler = (e:FormEvent)=>{
        e.preventDefault()
        const result = userLoginSchema.safeParse(input);
        if(!result.success){
            const fieldErrors = result.error.formErrors.fieldErrors
            setErros(fieldErrors as Partial <LoginInputState>)
            return
        }
        console.log(input);
        
    }
    const loading = false;

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form onSubmit={loginSubmitHandler} className="md:p-8 w-full md:max-w-md md:border md:border-gray-200 rounded-lg mx-4">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">FoodShadow</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <label htmlFor="email" className="sr-only">Email</label>
            <Input
              id="email"
              type="email"
              name='email'
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email"
              className="pl-10 focus:outline-none"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {erros && <span className="text-red-500 text-xs">{erros.email}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Password"
              className="pl-10 focus:outline-none"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {erros && <span className="text-red-500 text-xs">{erros.password}</span>}

          </div>
        </div>
        <div className="mb-4">
          <Button
            type="submit"
            className={`w-full ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange hover:bg-hoverOrange'}`}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </div>
        <Separator />
        <p className=" mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
