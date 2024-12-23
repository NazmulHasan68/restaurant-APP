import { CheckoutSessionRequest, OrderState } from '@/types/orderTypes';
import axios from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const API_END_POINT = 'http://localhost:8000/api/v1/order';
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            loading: false,
            orders: [],
            createCheckoutSession: async (checkoutsession: CheckoutSessionRequest) => {
                set({ loading: true });
                try {
                    const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutsession, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    window.location.href = response.data.session.url;
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        console.error('Checkout session error:', error.response?.data);
                    } else {
                        console.error('Unexpected error:', error);
                    }
                } finally {
                    set({ loading: false });
                }
            },
            getOrderDetails: async () => {
                set({ loading: true });
                try {
                    const response = await axios.get(`${API_END_POINT}`);
                    set({ orders: response.data.orders });
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        console.error('Order details error:', error.response?.data);
                    } else {
                        console.error('Unexpected error:', error);
                    }
                } finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: 'order-state',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
