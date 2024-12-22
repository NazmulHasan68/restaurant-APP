
import { MenuItem, RestaurantState, Restaurant } from '@/types/restaurantTypes';
import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const API_END_POINT = 'http://localhost:8000/api/v1/restaurant';
axios.defaults.withCredentials = true;


export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      loading: false,
      restaurant: null,
      searchResults: null,
      appliedFilter: [],
      singleRestaurant :null,
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

      searchRestaurant: async (searchText, searchQuery, selectedCuisines) => {
        if (!searchText || !searchQuery) {
          console.error("Invalid search parameters.");
          return;
        }
      
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          if (searchQuery) params.set("searchQuery", searchQuery);
          if (selectedCuisines.length > 0) params.set("selectedCuisines", selectedCuisines.join(","));
      
          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );
      
          if (response.data.success) {
            set({ searchResults: response.data });
          } else {
            toast.error(response.data.message || "Search failed");
          }
        } catch (error: any) {
          console.error("Search Error:", error);
          toast.error(error?.response?.data?.message || "Search failed");
        } finally {
          set({ loading: false });
        }
      },
         

      addMenuRestaurant: async (menu:MenuItem) => {
        set((state) => ({
          restaurant: state.restaurant
            ? {
                ...state.restaurant,
                menus: [...state.restaurant.menus, menu],
              }
            : null,
        }));
      },

      updateMenuToRestaurant: (updateMenu:MenuItem) => {
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

      setAppliedFilter: (value) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },

      setReseliedFilter : () =>{
        set({appliedFilter:[]})
      },

      getSingleRestaurant : async(restaurantId:string)=>{
        try {
          const response = await axios.get(`${API_END_POINT}/${restaurantId}`)
          if(response.data.success){
            set({singleRestaurant:response.data.restaurant})
          }
        } catch (error:any) {
          toast.error(error?.response?.data?.message || 'Something went wrong');
        }
      }
    }),
    {
      name: 'restaurant-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
