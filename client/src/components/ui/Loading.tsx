import { Loader2 } from "lucide-react"

function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800  via-bg-lightGreen to-emerald-900 w-full flex justify-center items-center">
      <Loader2 className=" animate-spin w-16 h-16 text-white"/>
    </div>
  )
}

export default Loading
