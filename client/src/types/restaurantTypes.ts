import { Orders } from "./orderTypes";

// Define types
export type MenuItem = {
    _id: string;
    name: string;
    description?: string;
    price?: number | undefined;
    image?:string;
  };
  
export type Restaurant = {
    _id: string;
    user: string;
    restaurantname:string;
    city:string;
    country:string;
    deliveryTime:number;
    cuisines:string[];
    menus: MenuItem[];
    imageUrl:string
  };
  
  
  
export  type RestaurantState = {
    loading: boolean;
    restaurant: Restaurant | null;
    searchResults: Restaurant[] | null;
    appliedFilter: string[];
    createRestaurant: (formData: FormData) => Promise<void>;
    getRestaurant: () => Promise<void>;
    updateRestaurant: (formData: FormData) => Promise<void>;
    searchRestaurant: (
      searchText: string,
      searchQuery: string,
      selectedCuisines: any
    ) => Promise<void>;
    addMenuRestaurant: (menu: MenuItem) => Promise<void>;
    updateMenuToRestaurant: (updateMenu: MenuItem) => void;
    setAppliedFilter: (value: string) => void;
    setReseliedFilter:()=>void;
    getSingleRestaurant : (restaurantId:string)=>Promise<void>;
    singleRestaurant:Restaurant | null;
    resturantOrders : Orders[];
    getRestaurantOrder : ()=>Promise<void>;
    updateResurantOrder : (orderId:string, status:string) =>Promise<void>
  };

  
  