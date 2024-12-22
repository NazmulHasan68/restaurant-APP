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
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { Dialog } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";

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
  const [errors, setErrors] = useState<Partial<MenuFormSchema>>({});
  const { loading, editMenu } = useMenuStore();

  const changeMenuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setMenuInput((prev) => ({
      ...prev,
      [name]: type === "file" ? e.target.files?.[0] || undefined : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Reset errors for the field
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(menuInput);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<MenuFormSchema>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", menuInput.name);
      formData.append("description", menuInput.description);
      formData.append("price", menuInput.price.toString());
      if (menuInput.image) {
        formData.append("image", menuInput.image);
      }
      await editMenu(selectedMenu._id, formData);
    } catch (error) {
      console.error("Error editing menu:", error);
    }
  };

  useEffect(() => {
    if (selectedMenu) {
      setMenuInput({
        name: selectedMenu?.name || "",
        description: selectedMenu?.description || "",
        price: selectedMenu?.price || 0,
        image: undefined, // Ensure no file is preselected
      });
    }
  }, [selectedMenu]);

  return (
    <Dialog open={editOpen} onOpenChange={setEditopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
              {errors.name && (
                <span className="text-xs font-medium text-red-500">
                  {errors.name}
                </span>
              )}
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
              {errors.description && (
                <span className="text-xs font-medium text-red-500">
                  {errors.description}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="price">Price in Taka</Label>
              <Input
                id="price"
                type="number"
                name="price"
                placeholder="Enter menu price"
                value={menuInput.price}
                onChange={changeMenuHandler}
              />
              {errors.price && (
                <span className="text-xs font-medium text-red-500">
                  {errors.price}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="imageFile">Upload Menu Image</Label>
              <Input
                id="imageFile"
                type="file"
                name="image"
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
      </DialogContent>
    </Dialog>
  );
}

export default EditMenu;
