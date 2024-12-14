import { Loader2, Mail, Map, MapPin, MapPinHouse, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { FormEvent, useRef, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

function Profile() {
  const [profileData, setProfileData] = useState({
    fullname: "",
    email:"",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<string>("");
  const fileChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prev) => ({ ...prev, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(profileData);
    //update profile api implementation
  };

  const loading= false
  return (
    <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className=" relative md:w-28 md:h-28 w-20 h-20">
            <AvatarImage src={selectedProfilePicture} className=" object-cover "/>
            <AvatarFallback>CN</AvatarFallback>
            <input
              type="file"
              className=" hidden "
              ref={imageRef}
              accept="image/*"
              onChange={fileChageHandler}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className=" rounded-full cursor-pointer absolute inset-0 items-center flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-45"
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>
          <input
            type="text"
            name="fullname"
            value={profileData.fullname}
            onChange={changeHandler}
            className="ml-2 font-bold text-2xl outline-none border-none focus-visible:ring-transparent bg-white text-black"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-xl p-2 bg-slate-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              type="text"
              name='email'
              value={profileData.email}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl p-2 bg-slate-200">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              type="text"
              name='address'
              value={profileData.address}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl p-2 bg-slate-200">
          <Map className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              type="text"
              name='city'
              value={profileData.city}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl p-2 bg-slate-200">
          <MapPinHouse className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              type="text"
              name='country'
              value={profileData.country}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="mx-auto">
        {
            loading ? (
                <Button disabled={loading} className=" bg-orange hover:bg-hoverOrange rounded-2xl"><Loader2 className="mr-2 w-4 h-4 animate-spin"/>Please wait</Button>
            ):(
                <Button type="submit" className=" bg-orange hover:bg-hoverOrange rounded-2xl">Update</Button>
            )
        }
        </div>
      </div>
    </form>
  );
}

export default Profile;
