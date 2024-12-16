import Image from "@/assets/herroImage.png"
import { IndianRupeeIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";


function Success() {
  const orders = [1, 2, 3];
  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found
        </h1>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-[85vh]  dark:gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 max-w-lg  w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Order Status : {" "} <span className="text-[#FF5A5A]">{"confirm".toUpperCase()}</span>
          </h1>
        </div>
        <div className="mb-2">
           <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Order Summary</h2>
            {/* your Orders item Display here */}
            <div className="my-1">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={Image} alt="" className="w-14 h-14 rounded-full object-cover"/>
                        <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">Pizza</h3>
                    </div>
                    <div className="text-right">
                        <div className="text-gray-800 dark:text-gray-200 flex items-center">
                            <IndianRupeeIcon/>
                            <span className="text-lg font-medium">800</span>
                        </div>
                    </div>
                </div>
                <Separator className="my-4"/>
            </div>

            <div className="my-1">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={Image} alt="" className="w-14 h-14 rounded-full object-cover"/>
                        <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">Pizza</h3>
                    </div>
                    <div className="text-right">
                        <div className="text-gray-800 dark:text-gray-200 flex items-center">
                            <IndianRupeeIcon/>
                            <span className="text-lg font-medium">800</span>
                        </div>
                    </div>
                </div>
                <Separator className="my-4"/>
            </div>
            <Link to='/cart' className="w-full flex justify-end">
                <Button className="bg-orange hover:bg-hoverOrange text-white rounded-xl">Continue Shopping</Button>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
