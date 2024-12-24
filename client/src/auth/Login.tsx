import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, loading } = useUserStore();
  const navigate = useNavigate()
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear specific error on change
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }

    try {
      await login(input); // Call login from the store
      navigate('/')
    } catch (error: any) {
      setApiError(error?.response?.data?.message || "Login failed. Please try again.");
    }
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
        {apiError && <div className="mb-4 text-red-500 text-sm">{apiError}</div>}

        <div className="mb-4">
          <div className="relative">
            <label htmlFor="email" className="sr-only">Email</label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email"
              className="pl-10 focus:outline-none"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
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
            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
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
          <div className="mt-4 flex justify-end">
            <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">
              Forgot Password
            </Link>
          </div>
        </div>

        <Separator />
        <p className="mt-2">
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
