import { Request, Response } from "express";
import uploadImageOncloudinary from "../utils/ImageUpload";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";

export const Addmenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, restaurantId } = req.body; // Include restaurantId from the client
        const file = req.file;

        // Validate the file (image) input
        if (!file) {
            res.status(400).json({
                success: false,
                message: "Image is required",
            });
            return; 
        }

        const imageUrl = await uploadImageOncloudinary(file as Express.Multer.File);

        // Check if the restaurant exists
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
            return;
        }
        const menu = await Menu.create({
            name,
            description,
            price,
            image: imageUrl,
            restaurant: restaurant._id, // Add restaurant reference to menu
        });

        // Add the menu to the restaurant's menus array
        restaurant.menus.push(menu._id as mongoose.Schema.Types.ObjectId);
        await restaurant.save();
        // Respond with success message and created menu data
        res.status(201).json({
            success: true,
            message: "Menu added successfully",
            menu,
        });
    } catch (error) {
        console.error("Error adding menu:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export const editMenu = async(req:Request, res:Response):Promise<void>=>{
    try {

        const {id} = req.params;
        const {name, description, price} = req.body

        const file = req.file
        const menu = await Menu.findById(id)
        if(!menu) {
            res.status(404).json({
                success:false,
                message:"Menu not found!"
            })
            return
        }
        if(name) menu.name = name;
        if(description) menu.description = description;
        if(price) menu.price = price;

        if(file) {
            const imageUrl = await uploadImageOncloudinary(file as Express.Multer.File)
            menu.image = imageUrl
        }
        await menu?.save()
        res.status(200).json({
            success:true,
            message:"Menu updated!"
        })

    } catch (error) {
        console.error("Error edit menu:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
