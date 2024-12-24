import { Button } from "@/components/ui/button";
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
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurant";

export default function AddMenu() {
  const [open, setOpen] = useState<boolean>(false); // Dialog state
  // const [loading, setLoading] = useState(false);
  const {loading, createMenu} = useMenuStore()
  const [errors, setErrors] = useState<Partial<MenuFormSchema>>({})
  const {restaurant} = useRestaurantStore()
  const [menuInput, setMenuInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined as File | undefined,
  });

  

  const [selectedMenu, setSeletectedMenu] = useState<MenuFormSchema>();

  const changeMenuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
  
    setMenuInput((prev) => ({
      ...prev,
      [name]:name === "price"
            ? value === "" 
            ? 0 
            : parseFloat(value) 
            : type === "file"
            ? e.target.files?.[0]
            : value,
    }));
  };
  

  const handleSubmit = async() => {
    const result = menuSchema.safeParse(menuInput);
    if(!result.success){
        const fieldErrors =  result.error.formErrors.fieldErrors
        setErrors(fieldErrors as Partial<MenuFormSchema>)
        return
    }
    // api start from Here
    try {
      const formData = new FormData()
      formData.append('name', menuInput.name)
      formData.append('description', menuInput.description)
      formData.append('price', menuInput.price.toString())
      if(menuInput.image){
        formData.append('image', menuInput.image)
      }
      console.log(menuInput.image);
      
      await createMenu(formData)
    } catch (error) {
      console.log(error);
    }
  };

 

  const [editOpen ,setEditopen] = useState<boolean>(false)

  return (
    <div className="max-w-5xl mx-auto my-10">
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
          <DialogContent className="">
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
                    {errors && <span className="text-xs font-medium text-red-500">{errors.name}</span>}
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
                     {errors && <span className="text-xs font-medium text-red-500">{errors.description}</span>}
                  </div>

                  <div>
                    <Label>Price in ()</Label>
                    <Input
                      type="text"
                      name="price"
                      placeholder="Enter menu price"
                      value={menuInput.price}
                      onChange={changeMenuHandler}
                    />
                     {errors && <span className="text-xs font-medium text-red-500">{errors.price}</span>}
                  </div>

                  <div>
                    <Label>Upload Menu Image</Label>
                    <Input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={changeMenuHandler}
                    />
                     {errors && <span className="text-xs font-medium text-red-500">{errors.image?.name}</span>}
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

      {restaurant?.menus.map((menu: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4 ">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg">
            <img
              src={menu.image}
              alt="menu image"
              className="md:h-24 md:w-24 h-28 w-full object-cover rounded-xl"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2 w-[90%] my-2">{menu.description}</p>
              <h2 className="text-md font-semibold">
                Price : <span className="text-[#D19254]">{menu.price}</span>
              </h2>
            </div>
            <Button
              size={"icon"}
              onClick={() => {
                setSeletectedMenu(menu)
                setEditopen(true)
              }}
              className="bg-orange hover:bg-hoverOrange rounded-xl mt-2 w-full md:w-fit md:px-4"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}

      <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditopen={setEditopen} />
    </div>
  );
}
