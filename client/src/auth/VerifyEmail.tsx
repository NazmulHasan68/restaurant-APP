import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyEmail = () => {
  const { verifyEmailCode, loading } = useUserStore();
  const [otp, setOpt] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<any>([]);
  const navigate = useNavigate()
  // Handle input changes
  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]+$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOpt(newOtp);
    }

    // Move to the next input field when a digit is entered
    if (value !== "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  // Handle backspace to focus on the previous field
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  // Handle form submission
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = otp.join("");

    // Check if OTP is complete
    if (verificationCode.length !== 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    // Call the verifyEmailCode function with the verification code
    try {
      await verifyEmailCode(verificationCode);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex-col gap-10 border border-gray-200 mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">Enter the 6-digit code sent to your email</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between mt-5">
            {otp.map((letter: string, idx: number) => (
              <input
                key={idx}
                ref={(element) => (inputRef.current[idx] = element)}
                maxLength={1}
                type="text"
                value={letter}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(idx, e)
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                className="md:w-12 md:h-12 w-10 h-10 text-center text-sm md:text-2xl font-normal md:font-bold rounded-xl focus:outline-none focus:ring-indigo-500 bg-slate-200"
              />
            ))}
          </div>
          {loading ? (
            <Button disabled={loading} className="bg-orange hover:bg-hoverOrange w-full mt-5">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="bg-orange hover:bg-hoverOrange w-full mt-5">
              Verify
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
