import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, LockKeyholeIcon,} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const ResetPassword = () => {
    const [newPassword, setnewPassword] = useState<string>("")
    const loading = false
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
        <form className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
            <div className="text-center">
                <h1 className="font-extrabold text-2xl">Reset Password</h1>
                <p className="text-sm text-gray-600">Enter your New Password </p>
            </div>
            <div className=" relative">
                <Input 
                    type="password"
                    value={newPassword} 
                    onChange={(e)=>setnewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pl-10 "
                />
                <LockKeyholeIcon className=" absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
            </div>
            {
                loading ? (
                    <Button className="bg-orange hover:bg-hoverOrange" disabled={loading}><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button>
                ):(
                    <Button className="bg-orange hover:bg-hoverOrange">Reset</Button>
                )
            }
            <span>Back to {" "}<Link className="text-blue-500 hover:underline" to='/login'>Login</Link></span>
        </form>
    </div>
  )
}

export default ResetPassword