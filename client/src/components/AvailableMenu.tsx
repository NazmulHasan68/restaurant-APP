import image from "@/assets/herroImage.png";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

function AvailableMenu() {
  return (
    <div className="md:p-4 ">
      <h1 className="text-xl md:text-2xl font-extralight mb-6">
        Available Menus
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        <Card className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden hover:shadow-xl duration-300">
          <img
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd7WPIPAo5hcd325ROuMa9FhdT5rQM1Io8pA&s"}
            alt="food image"
            className="w-full h-60 object-cover"
          />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Tamdori Birynani
            </h2>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur esse fugiat culpa.</p>
            <h3 className="text-lg font-semibold mt-4">
                Price : <span className="text-[#6d441c]">100৳</span>
            </h3>
          </CardContent>
          <CardFooter>
            <Button className=" bg-orange hover:bg-hoverOrange rounded-xl w-full">Add To cart</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AvailableMenu;
