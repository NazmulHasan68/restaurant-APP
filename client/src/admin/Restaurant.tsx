import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantFromSchema,
  RestaurantFromSchema,
} from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurant";
import { Loader2 } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";

function RestaurantAdmin() {
  const { loading, restaurant, updateRestaurant, createRestaurant, getRestaurant } =
    useRestaurantStore();

  const [input, setinput] = useState<RestaurantFromSchema>({
    restaurantname: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setinput({
      ...input,
      [name]: type === "number" ? (value === "" ? null : Number(value)) : value,
    });
  };

  const [errors, setErrors] = useState<Partial<RestaurantFromSchema>>();

  const submithandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurantFromSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error?.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantFromSchema>);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("restaurantname", input.restaurantname);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));
      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }
  
      // Debugging FormData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      if (restaurant) {
        // Update
        await updateRestaurant(formData);
      } else {
        // Create
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    const fetchRestuarnt = async()=>{
      await getRestaurant()
      setinput({
        restaurantname:restaurant?.restaurantname || "",
        city: restaurant?.city ||"",
        country:restaurant?.country || "",
        deliveryTime: restaurant?.deliveryTime || 0,
        cuisines: restaurant?.cuisines ? restaurant?.cuisines.map((cuisine:string) => cuisine) : [],
        imageFile: undefined,
      })
    }
    fetchRestuarnt()
    console.log(restaurant);
    
  },[])
  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
          <form onSubmit={submithandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant name */}
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  type="text"
                  name="restaurantname"
                  value={input.restaurantname}
                  onChange={changeEventHandler}
                  placeholder="Enter your restaurant name"
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.restaurantname}
                  </span>
                )}
              </div>

              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder="Enter your city name"
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.city}
                  </span>
                )}
              </div>

              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder="Enter your country name"
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.country}
                  </span>
                )}
              </div>

              <div>
                <Label>Delivery Time</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  placeholder="Delivery Time"
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>

              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) =>
                    setinput({
                      ...input,
                      cuisines: e.target.value.split(","),
                    })
                  }
                  placeholder="e.g Momos, Biryani"
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.cuisines}
                  </span>
                )}
              </div>

              <div>
                <Label>Upload Restaurant Banner</Label>
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) =>
                    setinput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.imageFile?.name || "image file is required!"}
                  </span>
                )}
              </div>

              <div>
                {loading ? (
                  <Button className=" bg-orange hover:bg-hoverOrange rounded-xl">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button className=" bg-orange hover:bg-hoverOrange rounded-xl">
                    {restaurant
                      ? "Update Your Restaurant"
                      : "Add Your Restaurant"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RestaurantAdmin;
