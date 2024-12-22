import image from "@/assets/herroImage.png";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useRestaurantStore } from "@/store/useRestaurant";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function AvailableMenu() {
  const params = useParams()
  const {getSingleRestaurant, singleRestaurant} = useRestaurantStore()
  useEffect(()=>{
    getSingleRestaurant(params.id!)
    console.log(singleRestaurant);
    
  },[params.id])
  return (
    <div className="md:p-4 ">
      <h1 className="text-xl md:text-2xl font-extralight mb-6">
        Available Menus
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0 gap-4 px-4">
        {
          singleRestaurant?.menus.map((item, index)=>(
            <Card key={index} className="max-w-sm mx-auto shadow-lg rounded-xl overflow-hidden hover:shadow-xl duration-300">
            <img
              src={item.image}
              alt="food image"
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {item?.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
              <h3 className="text-lg font-semibold mt-4">
                  Price : <span className="text-[#6d441c]">{item.price}৳</span>
              </h3>
            </CardContent>
            <CardFooter>
              <Button className=" bg-orange hover:bg-hoverOrange rounded-xl w-full">Add To cart</Button>
            </CardFooter>
          </Card>
          ))
        }
      </div>
    </div>
  );
}

export default AvailableMenu;
