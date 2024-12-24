import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import FilterPage from "./FilterPage";
import { useRestaurantStore } from "@/store/useRestaurant";
import { Restaurant } from "@/types/restaurantTypes";

// interface SearchResults {
//   data: Restaurant[]; // Assuming 'data' is an array of Restaurant objects
// }
// const searchResults: SearchResults | null

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    loading,
    searchRestaurant,
    searchResults,
    appliedFilter,
    setAppliedFilter,
  } = useRestaurantStore();
  useEffect(() => {
    if (params.text) {
      searchRestaurant(params.text, searchQuery, appliedFilter);
    }
  }, [params.text, searchQuery, appliedFilter, searchRestaurant]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          {/* Search Input */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisine"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              onClick={() => {
                if (params.text) {
                  searchRestaurant(params.text, searchQuery, appliedFilter);
                }
              }}
              className="bg-orange hover:bg-hoverOrange"
            >
              Search
            </Button>
          </div>

          {/* Search Results */}
          <div>
            {/* Result Info */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">
                ({0}) Search result(s) found
              </h1>
              <div className="flex flex-wrap gap-2">
                {appliedFilter.map((filter, idx) => (
                  <Badge
                    key={idx}
                    className="relative text-[#D19254] rounded-xl pr-6 cursor-pointer whitespace-nowrap"
                    variant="outline"
                  >
                    {filter}
                    <X
                      onClick={() => setAppliedFilter(filter)}
                      size={16}
                      className="absolute text-[#D19254] right-1 cursor-pointer"
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Restaurant Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="grid md:grid-cols-3 gap-4">
                {loading ? (
                  <SearchSkeleton />
                ) : searchResults && searchResults.length > 0 ? (
                  searchResults.map((restaurant: Restaurant, idx: number) => (
                    <RestaurantCard key={idx} restaurant={restaurant} />
                  ))
                ) : (
                  <NoResultFound searchText={params.text!} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

// Restaurant Card Component
const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
  <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
    <AspectRatio ratio={16 / 6}>
      <img
        src={restaurant?.imageUrl}
        alt="Restaurant"
        className="w-full h-full object-cover"
      />
    </AspectRatio>
    <CardContent className="p-4">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        {restaurant?.restaurantname}
      </h1>
      <div className="mt-2 flex items-center gap-1 text-gray-600 dark:text-gray-200">
        <MapPin size={16} />
        <p className="text-sm">
          City: <span className="font-medium">{restaurant?.city}</span>
        </p>
      </div>
      <div className="mt-2 flex items-center gap-1 text-gray-600 dark:text-gray-200">
        <Globe size={16} />
        <p className="text-sm">
          Country: <span className="font-medium">{restaurant?.country}</span>
        </p>
      </div>
      <div className="flex gap-1 mt-2 flex-wrap">
        {restaurant?.cuisines.map((cuisine, idx) => (
          <Badge key={idx} className="bg-gray-800 text-white rounded-xl px-3">
            {cuisine}
          </Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="p-4 border-t dark:border-t-gray-700 flex justify-end">
      <Link to={`/restaurant/${restaurant?._id}`}>
        <Button className="bg-orange hover:bg-hoverOrange rounded-full">
          View Menus
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

// Search Skeleton Component
const SearchSkeleton = () => (
  <>
    {[1, 2, 3].map((_, idx) => (
      <Card
        key={idx}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl"
      >
        <AspectRatio ratio={16 / 6}>
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </AspectRatio>
        <CardContent className="p-4">
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
          <div className="mt-2 h-4 w-1/2 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
          <div className="mt-2 h-4 w-1/2 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        </CardContent>
        <CardFooter className="p-4 border-t dark:border-t-gray-700">
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full"></div>
        </CardFooter>
      </Card>
    ))}
  </>
);

// No Results Found Component
const NoResultFound = ({ searchText }: { searchText: string }) => (
  <div className="text-center">
    <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
      No results found
    </h1>
    <p className="mt-2 text-gray-500 dark:text-gray-400">
      We couldn't find any results for "{searchText}". Try searching with a
      different term.
    </p>
    <Link to="/">
      <Button className="mt-4 bg-orange hover:bg-hoverOrange rounded-xl">
        Go Back to Home
      </Button>
    </Link>
  </div>
);
