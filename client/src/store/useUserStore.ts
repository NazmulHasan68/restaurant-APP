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
}

interface UpdateProfileInput {
  name?: string;
  email?: string;
  // Add other updatable fields here
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
          const { data } = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: { "Content-Type": "application/json" },
          });
          if (data.success) {
            toast.success(data.message);
            set({ user: data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Signup failed.");
          console.error("Signup error:", error);
        } finally {
          set({ loading: false });
        }
      },

      login: async (input) => {
        set({ loading: true });
        try {
          const { data } = await axios.post(`${API_END_POINT}/login`, input, {
            headers: { "Content-Type": "application/json" },
          });
          if (data.success) {
            toast.success(data.message);
            set({ user: data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Login failed.");
          console.error("Login error:", error);
        } finally {
          set({ loading: false });
        }
      },

      verifyEmailCode: async (verificationCode) => {
        set({ loading: true });
        try {
          const { data } = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            { headers: { "Content-Type": "application/json" } }
          );
          if (data.success) {
            set({ user: data.user, isAuthenticated: true });
            toast.success(data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Verification failed.");
          console.error("Verification error:", error);
        } finally {
          set({ loading: false });
        }
      },

      checkAuthentication: async () => {
        set({ isCheckingAuth: true });
        try {
          const { data } = await axios.get(`${API_END_POINT}/check-auth`);
          if (data.success) {
            set({ user: data.user, isAuthenticated: true });
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
          const { data } = await axios.post(
            `${API_END_POINT}/forgot-password`,
            { email },
            { headers: { "Content-Type": "application/json" } }
          );
          if (data.success) {
            toast.success(data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Request failed.");
          console.error("Forgot password error:", error);
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (token, newPassword) => {
        set({ loading: true });
        try {
          const { data } = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { newPassword },
            { headers: { "Content-Type": "application/json" } }
          );
          if (data.success) {
            toast.success(data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Reset failed.");
          console.error("Reset password error:", error);
        } finally {
          set({ loading: false });
        }
      },

      updateProfile: async (input) => {
        set({ loading: true });
        try {
          const { data } = await axios.put(
            `${API_END_POINT}/profile/update`,
            input,
            { headers: { "Content-Type": "application/json" } }
          );
          if (data.success) {
            set({ user: data.user, isAuthenticated: true });
            toast.success(data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Update failed.");
          console.error("Profile update error:", error);
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          const { data } = await axios.post(`${API_END_POINT}/logout`);
          if (data.success) {
            toast.success("Logged out successfully.");
            set({ user: null, isAuthenticated: false });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Logout failed.");
          console.error("Logout error:", error);
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
