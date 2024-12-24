import { Order } from './../models/order.model';
import { Restaurant } from './../models/restaurant.model';
import { Request, Response } from "express";
import uploadImageOncloudinary from "../utils/ImageUpload";

export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantname, city, country, deliveryTime, cuisines } = req.body;  
        const file = req.file;
        // Check if the restaurant already exists for the user
        const existingRestaurant = await Restaurant.findOne({ user: req.id });
        if (existingRestaurant) {
            res.status(400).json({
                success: false,
                message: "Restaurant already exists for this user",
            });
            return;
        }

        // Validate and upload the image
        if (!file) {
            res.status(400).json({
                success: false,
                message: "Image is required",
            });
            return;
        }
        const imageUrl = await uploadImageOncloudinary(file as Express.Multer.File);

        // Create and save the new restaurant
        const newRestaurant = new Restaurant({
            user: req.id,
            restaurantname,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines), // Parse cuisines if it's sent as a stringified JSON
            imageUrl,
        });

        await newRestaurant.save();

        // Respond with the created restaurant
        res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
            restaurant: newRestaurant,
        });
    } catch (error) {
        console.error("Error creating restaurant:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const getRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch restaurants for the authenticated user
        const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus')

        // Check if restaurants exist
        if (!restaurant) {
            res.status(404).json({
                success: false,
                restaurant:[],
                message: "No restaurants found for this user!",
            });
            return;
        }
        res.status(200).json({
            success: true,
            restaurant,
        });
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantname, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;

        // Find the restaurant for the authenticated user
        const restaurant = await Restaurant.findOne({ user: req.id });

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "No restaurants found for this user!",
            });
            return;
        }

        // Update restaurant fields if provided in the request
        if (restaurantname) restaurant.restaurantname = restaurantname;
        if (city) restaurant.city = city;
        if (country) restaurant.country = country;
        if (deliveryTime) restaurant.deliveryTime = deliveryTime;
        if (cuisines) restaurant.cuisines = JSON.parse(cuisines);

        // Update the image if a new file is provided
        if (file) {
            const imageUrl = await uploadImageOncloudinary(file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }

        // Save the updated restaurant
        await restaurant.save();

        res.status(200).json({
            success: true,
            message: "Restaurant updated successfully!",
            restaurant,
        });
    } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const getRestaurantOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch the restaurant for the authenticated user
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "No restaurants found for this user!",
            });
            return;
        }

        // Fetch orders associated with the restaurant
        const orders = await Order.find({ restaurant: restaurant._id })
            .populate("restaurant")
            .populate("user");

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Error fetching restaurant orders:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const searchRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchText = (req.params.searchText || "").trim();
        const searchQuery = (req.query.searchQuery as string || "").trim();
        const selectedCuisines = (req.query.selectedCuisines as string || "")
            .split(",")
            .filter((cuisine) => cuisine.trim());

        console.log("Inputs:", { searchText, searchQuery, selectedCuisines });

        const query: any = {};

        // Basic search based on searchText (restaurant name, city, country)
        if (searchText) {
            query.$or = [
                { restaurantname: { $regex: searchText, $options: "i" } },
                { city: { $regex: searchText, $options: "i" } },
                { country: { $regex: searchText, $options: "i" } },
            ];
        }

        // Filter on the basis of searchQuery
        if (searchQuery) {
            query.$or = query.$or || [];
            query.$or.push(
                { restaurantname: { $regex: searchQuery, $options: "i" } },
                { cuisines: { $regex: searchQuery, $options: "i" } }
            );
        }

        // Filter by selected cuisines
        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines };
        }

        console.log("Constructed Query:", JSON.stringify(query, null, 2));

        // Find restaurants based on the constructed query
        const restaurants = await Restaurant.find(query);
        res.status(200).json({
            success: true,
            data: restaurants,
        });
    } catch (error) {
        console.error("Error searching restaurants:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



export const getSingleRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurantId = req.params.id;

        // Find restaurant by ID and populate the 'menus' field
        const restaurant = await Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { sort: { createdAt: -1 } }, // Sort menus by createdAt descending
        });

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found!",
            });
            return;
        }

        // Respond with the restaurant data
        res.status(200).json({
            success: true,
            restaurant,
        });
    } catch (error) {
        console.error("Error fetching single restaurant:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      // Find the order by ID
      const order = await Order.findById(orderId);
      if (!order) {
        res.status(404).json({
          success: false,
          message: "Order not found!",
        });
        return;
      }
  
      // Update the order's status and save
      order.status = status;
      await order.save();
  
      res.status(200).json({
        success: true,
        message: "Status updated successfully!",
        status: order.status, 
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };