import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function Orders() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6 bg-slate-50">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>
      <div className="space-y-8 ">
        {/* restaurant order dispalay Here */}
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white data:bg-gray-800 shadow-xl p-6 sm:p-8 border-gray-700 ">
          <div className="flex-1 mb-6 sm:mb-0 ">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 ">
              FoodShadow
            </h1>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              <span className="font-semibold">Address : </span>
              Lorem, ipsum dolor.
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              <span className="font-semibold">Total Amount : </span>
              160
            </p>
          </div>
          <div className="w-full sm:w-1/3">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Orders status
            </Label>
            <Select>
              <SelectTrigger className="md:w-[180px] w-full">
                <SelectValue placeholder="Pending" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                    {
                        ["Pending", "confirmed", "Preparing", "outForDelivery", "Delivered"].map((status:string ,idx:number)=>(
                            <SelectItem key={idx} value={status.toLocaleLowerCase()}>{status}</SelectItem>
                        ))
                    }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white data:bg-gray-800 shadow-xl p-6 sm:p-8 border-gray-700 ">
          <div className="flex-1 mb-6 sm:mb-0 ">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 ">
              FoodShadow
            </h1>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              <span className="font-semibold">Address : </span>
              Lorem, ipsum dolor.
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              <span className="font-semibold">Total Amount : </span>
              160
            </p>
          </div>
          <div className="w-full sm:w-1/3">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Orders status
            </Label>
            <Select>
              <SelectTrigger className="md:w-[180px] w-full">
                <SelectValue placeholder="Pending" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                    {
                        ["Pending", "confirmed", "Preparing", "outForDelivery", "Delivered"].map((status:string ,idx:number)=>(
                            <SelectItem key={idx} value={status.toLocaleLowerCase()}>{status}</SelectItem>
                        ))
                    }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;