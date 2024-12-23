import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CheckoutSessionRequest = {
    cartItem: {
        menuId: string,
        name: string,
        image: string,
        price: number,
        quantity: number
    }[],
    deliveryDetails: {
        name: string,
        email: string,
        address: string,
        city: string
    },
    restaurantId: string
};

// Fetch orders for a user
export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find({ user: req.id })
            .populate('user')
            .populate('restaurant');

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Create a checkout session with Stripe
export const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menus');

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found!"
            });
            return;
        }

        // Create an order document
        const order = new Order({
            restaurant: restaurant._id,
            user: req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest?.cartItem,
            status: "pending"
        });

   
        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menus);
        
        // Create a Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['GB', 'US', 'CA'],
            },
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/order/status`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            metadata: {
                orderId: order.id?.toString() || '', // Safeguard for missing order ID
                images: JSON.stringify(
                    restaurant?.menus?.map((item: any) => item.image) || [] // Safeguard for missing or undefined images
                ),
            },
        });

        if (!session.url) {
            res.status(400).json({ success: false, message: "Error creating session" });
            return;
        }

        // Save the order to the database
        await order.save();

        // Return the session URL for the frontend
        res.status(200).json({
            success: true,
            session
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Helper function to create line items for Stripe checkout session
export const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: any[]): any[] => {
    try {
        return checkoutSessionRequest?.cartItem?.map((cartItem) => { 
            const menuItem = menuItems.find((item: any) => item._id.toString() === cartItem.menuId);
            
            if (!menuItem) {
                throw new Error(`Menu item with ID ${cartItem.menuId} not found!`);
            }
            const itemPrice = menuItem.price || cartItem.price;  
            const itemImage = menuItem.image || cartItem.image;  

            return {
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: menuItem.name || cartItem.name,
                        images: [itemImage],
                    },
                    unit_amount: itemPrice * 100, 
                },
                quantity: cartItem.quantity 
            };
        });
    } catch (error) {
        console.error("Error creating line items:", error);
        throw error;
    }
};
