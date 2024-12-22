import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const API_END_POINT = 'http://localhost:8000/api/v1/restaurant';
axios.defaults.withCredentials = true;

type RestaurantState = {
  loading: boolean;
  restaurant: any | null;
  searchResults: any[] | null;
  createRestaurant: (formData: FormData) => Promise<void>;
  getRestaurant: () => Promise<void>;
  updateRestaurant: (formData: FormData) => Promise<void>;
  searchRestaurant: (
    searchText: string,
    searchQuery: string,
    selectedCuisines: string
  ) => Promise<void>;
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
            set({ loading: false, restaurant: response.data.restaurants });
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
            console.log(response.data);
            set({ loading: false, searchResults: response.data.data });
          }
        } catch (error :any) {
          toast.error(error?.response?.data?.message || 'search Restaurant failed');
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'restaurant-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
