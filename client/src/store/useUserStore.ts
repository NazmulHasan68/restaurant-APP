
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

interface User {
  id: string;
  email: string;
  name: string;
  // Add other properties of your user object here
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmailCode: (verificationCode: string[]) => Promise<void>;
  logout: () => void;
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
        set({ loading: true });
        try {
          const { data } = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: { "Content-Type": "application/json" },
          });

          if (data.success) {
            toast.success(data.message);
            set({
              user: data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Signup failed.");
          console.error("Signup error:", error);
        } finally {
          set({ loading: false });
        }
      },

      // Login API implementation
      login: async (input: LoginInputState) => {
        set({ loading: true });
        try {
          const { data } = await axios.post(`${API_END_POINT}/login`, input, {
            headers: { "Content-Type": "application/json" },
          });

          if (data.success) {
            toast.success(data.message);
            set({
              user: data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(
            error?.response?.data?.message || "Invalid login credentials."
          );
          console.error("Login error:", error);
        } finally {
          set({ loading: false });
        }
      },

      //verigy email implementation
      verifyEmailCode: async (verificationCode: string[]) => {
        try {
          set({ loading: true });
      
          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
      
          if (response.data.success) {
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
            toast.success(response.data.message);  // Optional: You could display a success message here
          } else {
            toast.error("Email verification failed.");
          }
        } catch (error: any) {
          toast.error(
            error?.response?.data?.message || "Invalid verification credentials."
          );
          console.error("Verification error:", error);
        } finally {
          set({ loading: false });
        }
      },
      
      // Logout Implementation
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
        toast.success("Logged out successfully.");
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
