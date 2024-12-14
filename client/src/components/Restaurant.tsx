import image from "@/assets/herroImage.png";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "./AvailableMenu";
function Restaurant() {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className=" relative w-full h-32 mf:h-64 lg:h-72">
          <img
            src={image}
            alt="restaurant image"
            className=" object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between ">
          <div className="my-5">
            <h1 className="font-medium text-xl">Tandori tadka</h1>
            <div className="flex gap-2 my-2">
              {["Biryani", "Momos"].map((cuisine: string, idx: number) => (
                <Badge key={idx}>{cuisine}</Badge>
              ))}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time :{" "}
                </h1>{" "}
                <span className="text-[#a8713a]">35 mins</span>
              </div>
            </div>
            <AvailableMenu/>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Restaurant;
