import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";

function Navbar() {
  const {user, loading, logout} = useUserStore()
  const {cart} = useCartStore()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14 px-2">
        {/* Logo Section */}
        <Link to="/">
          <h1 className="font-bold md:font-extrabold text-2xl">FoodShadow</h1>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/order/status">Order</Link>
          </div>

          {/* Admin Dashboard Links */}
          {user?.admin && (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Dashboard</MenubarTrigger>
                <MenubarContent>
                  <Link to="/admin/restaurant">
                    <MenubarItem>Restaurant</MenubarItem>
                  </Link>
                  <Link to="/admin/menu">
                    <MenubarItem>Menu</MenubarItem>
                  </Link>
                  <Link to="/admin/orders">
                    <MenubarItem>Orders</MenubarItem>
                  </Link>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
          <div className="md:flex items-center gap-4 hidden ">
            <Link to="/cart" className=" relative cursor-pointer ">
              <ShoppingCart />
              {
                cart.length > 0 &&(
                <Button
                  size={"icon"}
                  className=" absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-600"
                >
                  {cart.length}
                </Button>
                )
              }
            </Link>
            <div>
              <Avatar>
                <AvatarImage
                  className="w-full h-full object-cover"
                  src={user?.profilePicture ||"https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Light</DropdownMenuItem>
                  <DropdownMenuItem>Dark</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              {loading ? (
                <Button className="bg-orange hover:bg-hoverOrange rounded-xl">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={logout} className=" rounded-xl bg-orange hover:bg-hoverOrange">
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* mobile responsive */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

const MobileNavbar = () => {
  const {user, logout} = useUserStore()
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          size={"icon"}
          className=" rounded-full bg-slate-200 text-black hover:bg-gray-300"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row justify-between items-center mt-3">
          <SheetTitle>FoodShadow</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Light</DropdownMenuItem>
              <DropdownMenuItem>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator/>
        <SheetDescription className="flex-1">
            <Link to='/profile' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium text-gray-800">
                <User/>
                <span>Profile</span>
            </Link>
            <Link to='/order' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium text-gray-800">
                <HandPlatter/>
                <span>Orders</span>
            </Link>
            <Link to='/cart' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium text-gray-800">
                <ShoppingCart/>
                <span>Cart(0)</span>
            </Link>
            {
              user?.admin && (
                <>
                  <Link to='/admin/menu' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium text-gray-800">
                    <SquareMenu/>
                    <span>Menu</span>
                  </Link>
                  <Link to='/admin/restaurant' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium text-gray-800">
                      <UtensilsCrossed/>
                      <span>Restaurant</span>
                  </Link>
                  <Link to='/admin/orders' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium text-gray-800">
                      <PackageCheck/>
                      <span>Restaurant order</span>
                  </Link>
                </>
              )
            }
        </SheetDescription>
        <SheetFooter className="flex flex-col items-start  gap-2">
            <div className="flex flex-row items-center gap-2">
                <Avatar>
                    <AvatarImage className="w-full h-full object-cover" src={user?.profilePicture}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-bold">Nazmul hasan</h1>
            </div>
            <SheetClose asChild>
                <Button type="submit" onClick={logout} className="bg-orange hover:bg-hoverOrange rounded-xl w-full">Logout</Button>
            </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
