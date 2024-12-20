import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { SignupInputState } from "@/schema/userSchema";
import { Toaster } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

interface UserState {
  user: null | Record<string, any>;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      // Signup API implementation
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/signup`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.success) {
            console.log(response.data);
            Toaster(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.error("Signup error:", error);
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
