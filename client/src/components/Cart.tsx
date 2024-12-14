import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";

function Cart() {
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant="link">Clear all</Button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Items</TableHead>
            <TableHead >Title</TableHead>
            <TableHead >Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead >Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow >
              <TableCell>
                <Avatar>
                    <AvatarImage/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className=" line-clamp-1">Biryani Special</TableCell>
              <TableCell>100</TableCell>
              <TableCell  className=" flex justify-center">
                <div className="w-fit flex items-center gap-1 rounded-full border-gray-100 dark:gray-800">
                    <Button size={'icon'} variant={'outline'} className="bg-gray-200 rounded-full hover:bg-gray-300"><Minus/></Button>
                    <Button disabled className="bg-white text-black">1</Button>
                    <Button size={'icon'} variant={'outline'} className="bg-gray-200 rounded-full hover:bg-gray-300"><Plus/></Button>
                </div>
              </TableCell>
              <TableCell>10</TableCell>
              <TableCell className=" flex justify-end">
                <Button className="bg-orange hover:bg-hoverOrange rounded-xl">Remove</Button>
              </TableCell>
            </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button className="bg-orange hover:bg-hoverOrange rounded-xl"> Proced To CHeckout</Button>
      </div>
    </div>
  );
}

export default Cart;
