import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const API_END_POINT = 'http://localhost:8000/api/v1/restaurant';
axios.defaults.withCredentials = true;

// Define types
type MenuItem = {
  _id: string;
  name: string;
  description?: string;
  price?: number;
};

type Restaurant = {
  id: string;
  name: string;
  menus: MenuItem[];
  // Add other restaurant fields as needed
};

type RestaurantState = {
  loading: boolean;
  restaurant: Restaurant | null;
  searchResults: Restaurant[] | null;
  createRestaurant: (formData: FormData) => Promise<void>;
  getRestaurant: () => Promise<void>;
  updateRestaurant: (formData: FormData) => Promise<void>;
  searchRestaurant: (
    searchText: string,
    searchQuery: string,
    selectedCuisines: string
  ) => Promise<void>;
  addMenuRestaurant: (menu: any) => Promise<void>;
  updateMenuToRestaurant: (updateMenu: any) => void;
};

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      loading: false,
      restaurant: null,
      searchResults: null,

      // Create a new restaurant
      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
          set({ loading: false });
        }
      },

      // Get restaurants
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}`);
          if (response.data.success) {
            set({ restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          if (error?.response?.status === 404) {
            set({ restaurant: null });
          }
          toast.error(error?.response?.data?.message || 'Failed to fetch restaurants');
        } finally {
          set({ loading: false });
        }
      },

      // Update a restaurant
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'Update failed');
        } finally {
          set({ loading: false });
        }
      },

      // Search restaurants
      searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: string) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set('searchQuery', searchQuery);
          params.set('selectedCuisines', selectedCuisines);

          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );

          if (response.data.success) {
            set({ searchResults: response.data.data });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'Search failed');
        } finally {
          set({ loading: false });
        }
      },

      // Add a menu to the restaurant
      addMenuRestaurant: async (menu: any) => {
        set((state) => ({
          restaurant: state.restaurant
            ? {
                ...state.restaurant,
                menus: [...(state.restaurant.menus || []), menu],
              }
            : null,
        }));
      },

      // Update an existing menu in the restaurant
      updateMenuToRestaurant: (updateMenu: any) => {
        set((state) => {
          if (state.restaurant) {
            const updatedMenus = state.restaurant.menus.map((menu) =>
              menu._id === updateMenu._id ? updateMenu : menu
            );

            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenus,
              },
            };
          }
          return state; 
        });
      },
    }),
    {
      name: 'restaurant-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
