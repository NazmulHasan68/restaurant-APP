import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"; // Assuming you're using a Dialog component from your UI library
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useUserStore } from "@/store/useUserStore";
import { CheckoutSessionRequest } from "@/types/orderTypes";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurant";
import { useOrderStore } from "@/store/useOrderStore";
import { Loader2 } from "lucide-react";

interface CheckoutConfirmPageProps {
  open: boolean;
  setopen: Dispatch<SetStateAction<boolean>>;
}

export default function CheckoutConfirmPage({ open, setopen }: CheckoutConfirmPageProps) {
  const {user} = useUserStore()
  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city ||"",
    country: user?.country || "",
  });
  const {cart} = useCartStore()
  const {restaurant} = useRestaurantStore()
  const {createCheckoutSession , loading} = useOrderStore()

  const handleClose = () => {
    setopen(false);
  };

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const checkoutHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const checkoutData: CheckoutSessionRequest = {
          cartItem: cart.map((cartItem) => ({
              menuId: cartItem._id,
              name: cartItem.name,
              image: cartItem.image as string,
              price: cartItem.price ? cartItem.price.toString() : '0', 
              quantity: cartItem.quantity.toString(),
          })),
          deliveryDetails: input,
          restaurantId: restaurant?._id as string,
      };
      await createCheckoutSession(checkoutData)
  
      // Use `checkoutData` as needed
  } catch (error) {
      console.log(error);
  }
  
  
  

  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review your order</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-xs">
          Double-check your delivery details and ensure everything is okay. When you are ready, hit
          the confirm button to finalize your order.
        </DialogDescription>

        <form onSubmit={checkoutHandler} className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0">
          <div>
            <Label>Fullname</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              required
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              disabled
              value={input.email}
              onChange={changeEventHandler}
              required
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
              required
            />
          </div>
          <div>
            <Label>Contact</Label>
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              required
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
              required
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
              required
            />
          </div>

          <DialogFooter className="flex justify-end gap-2 col-span-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            {
              loading ? (
                <Button disabled className="bg-orange hover:bg-hoverOrange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Pleace wait
                </Button>
              ):(
                <Button type="submit" className="bg-orange hover:bg-hoverOrange">
                  Continue To Payment
                </Button>
              )
            }
           
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
