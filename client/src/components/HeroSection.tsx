import { useState } from "react"
import { Input } from "./ui/input"
import { Search } from "lucide-react"
import { Button } from "./ui/button"

import heroImage from "../assets/herroImage.png"

function HeroSection() {
    const [searchText, setSearchText] = useState<string>("")
  return (
    <div className='flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-xl items-center justify-center gap-20 m-4'>
      <div className='flex flex-col gap-10 md:w-[40%]'>
        <div className=''>
            <h1 className=" font-bold md:font-extrabold md:text-5xl text-4xl ">Order Food anytime & anywhere</h1>
            <p className="text-gary-500 py-2"> Hey! Our Delicious food is waiting for you, we are always near to you</p>
        </div>
        <div className="relative flex items-center gap-2 w-">
            <Input
                type="text"
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
                className="pl-10 shadow-xl focus:outline-none focus-visible:ring-0 py-5 rounded-xl"
            />
            <Search className=" absolute text-gray-500 inset-y-2 left-2"/>
            <Button className="bg-orange hover:bg-hoverOrange rounded-xl">Search</Button>
        </div>
      </div>
      <div>
        <img  src={heroImage} alt="Hero section Image" className=" object-cover w-full "/>
      </div>
    </div>
  )
}

export default HeroSection
