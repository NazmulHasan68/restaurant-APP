
// Define types
export type MenuItem = {
    _id: string;
    name: string;
    description?: string;
    price?: number;
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
  };
  