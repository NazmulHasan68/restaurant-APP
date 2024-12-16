import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema } from "@/schema/menuSchema";
import { Dialog } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function EditMenu({
  selectedMenu,
  editOpen,
  setEditopen,
}: {
  selectedMenu: any;
  editOpen: boolean;
  setEditopen: Dispatch<SetStateAction<boolean>>;
}) {
  const [menuInput, setMenuInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined as File | undefined,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedMenu) {
      setMenuInput({
        name: selectedMenu?.name || "",
        description: selectedMenu?.description || "",
        price: selectedMenu?.price || "",
        image: selectedMenu?.image || undefined,
      });
    }
  }, [selectedMenu]);

  const changeMenuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setMenuInput((prev) => ({
      ...prev,
      [name]: type === "file" ? e.target.files?.[0] || undefined : value,
    }));
  };

  const handleSubmit = async () => {
  
    setLoading(true);

    console.log(menuInput);
    
    try {
      alert("Menu updated successfully!");
      setEditopen(false);
    } catch (error) {
      alert("Failed to update menu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={editOpen} onOpenChange={setEditopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting.
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Enter menu name"
                value={menuInput.name}
                onChange={changeMenuHandler}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                placeholder="Enter menu description"
                value={menuInput.description}
                onChange={changeMenuHandler}
              />
            </div>

            <div>
              <Label htmlFor="price">Price in Taka</Label>
              <Input
                id="price"
                type="text"
                name="price"
                placeholder="Enter menu price"
                value={menuInput.price}
                onChange={changeMenuHandler}
              />
            </div>

            <div>
              <Label htmlFor="imageFile">Upload Menu Image</Label>
              <Input
                id="imageFile"
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={changeMenuHandler}
              />
            </div>
          </div>

          <DialogFooter className="mt-5">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange rounded-xl mt-2">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="bg-orange hover:bg-hoverOrange rounded-xl mt-2">
                Submit
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditMenu;
