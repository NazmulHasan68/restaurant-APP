import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

// Environment-based API endpoint configuration
const API_END_POINT =  "http://localhost:8000/api/v1/user";

// Create an Axios instance for reuse
const api = axios.create({
  baseURL: API_END_POINT,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});


interface User {
  id: string;
  email: string;
  fullname: string;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
}

interface UpdateProfileInput {
  fullname?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  profilePicture?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmailCode: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: UpdateProfileInput) => Promise<void>;
  logout: () => Promise<void>;
}

// Error handler utility
const handleError = (error: any, defaultMessage: string) => {
  toast.error(error?.response?.data?.message || defaultMessage);
  console.error(error);
};

// Zustand store
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      signup: async (input) => {
        set({ loading: true });
        try {
          const { data } = await api.post("/signup", input);
          if (data.success) {
            toast.success(data.message);
            set({ user: data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          handleError(error, "Signup failed.");
        } finally {
          set({ loading: false });
        }
      },

      login: async (input) => {
        set({ loading: true });
        try {
          const { data } = await api.post("/login", input);
          if (data.success) {
            toast.success(data.message);
            set({ user: data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          handleError(error, "Login failed.");
        } finally {
          set({ loading: false });
        }
      },

      verifyEmailCode: async (verificationCode) => {
        set({ loading: true });
        try {
          const { data } = await api.post("/verify-email", { verificationCode });
          if (data.success) {
            set({ user: data.user, isAuthenticated: true });
            toast.success(data.message);
          }
        } catch (error: any) {
          handleError(error, "Verification failed.");
        } finally {
          set({ loading: false });
        }
      },

      checkAuthentication: async () => {
        set({ isCheckingAuth: true });
        try {
          const { data } = await api.get("/check-auth");
          if (data.success) {
            set({ user: data.user, isAuthenticated: true , isCheckingAuth:false });
          }
        } catch (error: any) {
          console.error("Auth check error:", error);
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      forgotPassword: async (email) => {
        set({ loading: true });
        try {
          const { data } = await api.post("/forgot-password", { email });
          if (data.success) {
            toast.success(data.message);
          }
        } catch (error: any) {
          handleError(error, "Password reset request failed.");
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (token, newPassword) => {
        set({ loading: true });
        try {
          const { data } = await api.post(`/reset-password/${token}`, {
            newPassword,
          });
          if (data.success) {
            toast.success(data.message);
          }
        } catch (error: any) {
          handleError(error, "Reset password failed.");
        } finally {
          set({ loading: false });
        }
      },

      updateProfile: async (input) => {
        set({ loading: true });
        try {
          const { data } = await api.put("/profile/update", input);
          if (data.success) {
            set({ user: data.user, isAuthenticated: true });
            toast.success(data.message);
          }
        } catch (error: any) {
          handleError(error, "Profile update failed.");
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          const { data } = await api.post("/logout");
          if (data.success) {
            toast.success("Logged out successfully.");
            set({ user: null, isAuthenticated: false });
          }
        } catch (error: any) {
          handleError(error, "Logout failed.");
        } finally {
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

