import { Button } from "@/components/ui/button";
import Image from "@/assets/herroImage.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

export default function AddMenu() {
  const [open, setOpen] = useState<boolean>(false); // Dialog state
  const [loading, setLoading] = useState(false);

  const [menuInput, setMenuInput] = useState({
    name: "",
    description: "",
    price: "",
    imageFile: undefined as File | undefined,
  });

  const changeMenuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setMenuInput((prev) => ({
      ...prev,
      [name]: type === "file" ? e.target.files?.[0] || undefined : value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !menuInput.name ||
      !menuInput.description ||
      !menuInput.price ||
      !menuInput.imageFile
    ) {
      alert("All fields are required!");
      return;
    }

    if (isNaN(Number(menuInput.price))) {
      alert("Please enter a valid price.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", menuInput.name);
    formData.append("description", menuInput.description);
    formData.append("price", menuInput.price);
    formData.append("image", menuInput.imageFile);

    try {
      // Example API call to submit form data
      // await fetch("/api/menus", { method: "POST", body: formData });
      console.log("Submitting form data:", formData);
      alert("Menu added successfully!");
      setMenuInput({
        name: "",
        description: "",
        price: "",
        imageFile: undefined,
      });
      setOpen(false); // Close the dialog after successful submission
    } catch (error) {
      alert("Failed to add menu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>
        {/* Dialog Component */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orange hover:bg-hoverOrange rounded-xl">
              <Plus className="mr-2" />
              Add Menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogHeader className="mt-5">
                <DialogTitle>Add A New Menu</DialogTitle>
                <DialogDescription>
                  Create a menu that will make your restaurant stand out.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter menu name"
                      value={menuInput.name}
                      onChange={changeMenuHandler}
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Input
                      type="text"
                      name="description"
                      placeholder="Enter menu description"
                      value={menuInput.description}
                      onChange={changeMenuHandler}
                    />
                  </div>

                  <div>
                    <Label>Price in (Taka)</Label>
                    <Input
                      type="text"
                      name="price"
                      placeholder="Enter menu price"
                      value={menuInput.price}
                      onChange={changeMenuHandler}
                    />
                  </div>

                  <div>
                    <Label>Upload Menu Image</Label>
                    <Input
                      type="file"
                      name="imageFile"
                      accept="image/*"
                      onChange={changeMenuHandler}
                    />
                  </div>
                </div>

                <DialogFooter className="mt-5">
                  {loading ? (
                    <Button
                      disabled
                      className="bg-orange hover:bg-hoverOrange rounded-xl mt-2"
                    >
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-orange hover:bg-hoverOrange rounded-xl mt-2"
                    >
                      Submit
                    </Button>
                  )}
                </DialogFooter>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6 space-y-4 ">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg">
          <img
            src={Image}
            alt="menu image"
            className="md:h-24 md:w-24 h-16 w-full object-cover rounded-xl"
          />
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-800">Birynai</h1>
            <p className="text-sm text-gray-500 mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <h2 className="text-md font-semibold">
              Price : <span className="text-[#D19254]">80</span>
            </h2>
          </div>
          <Button
            size={"icon"}
            className="bg-orange hover:bg-hoverOrange rounded-xl mt-2 w-full md:w-fit md:px-4"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
