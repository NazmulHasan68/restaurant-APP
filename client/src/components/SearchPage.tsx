import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import hero from "../assets/herroImage.png";

function SearchPage() {
  const params = useParams();
  const [searchQuery, setsearchQuery] = useState<string>("");

  return (
    <div className="max-w-7xl mx-auto my-10 ">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          {/* search input field */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisinse"
              onChange={(e) => setsearchQuery(e.target.value)}
            />
            <Button className="bg-orange hover:bg-hoverOrange ">Search</Button>
          </div>
          {/* search item display here */}
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">(1) Search result found</h1>
              <div className="flex flex-wrap gap-2 md-4 md:mb-0">
                {["biryani", "momos", "jelebi"].map(
                  (selectedFilter: string, idx: number) => (
                    <div
                      key={idx}
                      className=" relative inline-flex items-center mx-1 "
                    >
                      <Badge
                        className="text-[#D19254] rounded-xl hover:cursor-pointer pr-6 whitespace-nowrap text-center"
                        variant={"outline"}
                      >
                        {selectedFilter}
                      </Badge>
                      <X
                        size={16}
                        className=" absolute text-[#D19254] right-1 hover:cursor-pointer"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            {/* Restaurant Cards */}
            <div className="grid md:grid-cols-3 gap-4 ">
                {
                    [1, 2, 3].map((item:number, idx:number)=>(
                    <Card key={idx} className=" bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ">
                        <div className=" relative">
                        <AspectRatio ratio={16 / 6}>
                            <img
                            src={hero}
                            alt="card Image"
                            className="w-full h-full object-cover "
                            />
                        </AspectRatio>
                        <div className=" absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-xl py-1 px-3">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Featured
                            </span>
                        </div>
                        <CardContent className="p-4">
                            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 ">
                            Pizza Hunt
                            </h1>
                            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-200">
                            <MapPin size={16} />
                            <p className="text-sm">
                                City : <span className="font-medium">Dhaka</span>
                            </p>
                            </div>
                            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-200">
                            <Globe size={16} />
                            <p className="text-sm">
                                Country :{" "}
                                <span className="font-medium">Bangladesh</span>
                            </p>
                            </div>
                            <div className="flex gap-1 mt-2 flex-wrap ">
                            {["biryani", "momos", "jelebi"].map(
                                (selectedFilter: string, idx: number) => (
                                <div
                                    key={idx}
                                    className=" relative inline-flex items-center mx-1 "
                                >
                                    <Badge
                                    className="text-[#ffffff] bg-gray-800 rounded-xl hover:cursor-pointer pr-6 whitespace-nowrap text-center"
                                    >
                                    {selectedFilter}
                                    </Badge>
                                </div>
                                )
                            )}
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                            <Link to={`/restaurant/${123}`}>
                                <Button className=" bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">View Menus</Button>
                            </Link>
                        </CardFooter>
                        </div>
                    </Card>
                    ))
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
