
import { CheckoutSessionRequest } from '@/types/orderTypes';
import axios from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const API_END_POINT = 'http://localhost:8000/api/v1/order';
axios.defaults.withCredentials = true

export const useOrderStore = create(
    persist(
        (set) => ({
            loading : false,
            orders:[],
            createCheckoutSession : async(checkoutsession:CheckoutSessionRequest)=>{
                try {
                    set({loading:false})
                    const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutsession, {
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    })
                    window.location.href = response.data.session.url
                    set({loading:false})
                } catch (error:any) {
                    console.log(error);
                    set({loading:false})
                }
            },
            getOrderDetails : async()=>{

            }
        }),
        {
            name: 'order-name', // Key for localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);
