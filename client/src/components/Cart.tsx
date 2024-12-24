import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "@/store/useCartStore";

function Cart() {
  const [open, setopen] = useState<boolean>(false);
  const {
    cart,
    clearCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCartStore();

  const totalAmount = cart.reduce((acc, ele) => {
    return acc + (ele?.price ?? 0) * ele.quantity;
  }, 0);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant="link" onClick={()=>clearCart()}>Clear all</Button>
      </div>
      <Table className="min-w-[600px] ">
        <TableCaption>Have a Look befor confirm your order!</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right" >Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            cart.map((item)=>(
            <TableRow key={item._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item?.image}/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className=" line-clamp-1">{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell className=" flex justify-center">
                <div className="w-fit flex items-center gap-1 rounded-full border-gray-100 dark:gray-800">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={()=>decrementQuantity(item._id)}
                    className="bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <Minus />
                  </Button>
                  <Button disabled className="bg-white text-black">
                    {item.quantity}
                  </Button>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={()=>incrementQuantity(item._id)}
                    className="bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{item?.price ?? 0 * item.quantity}</TableCell>
              <TableCell className=" flex justify-end">
                <Button onClick={()=>removeFromCart(item._id)} className="bg-orange hover:bg-hoverOrange rounded-xl">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
            ))
          }
        </TableBody>
        <TableFooter>
          <TableRow className="text-xl font-semibold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{totalAmount} Taka</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setopen(true)}
          className="bg-orange hover:bg-hoverOrange rounded-xl"
        >
          {" "}
          Proced To CHeckout
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setopen={setopen} />
    </div>
  );
}

export default Cart;
