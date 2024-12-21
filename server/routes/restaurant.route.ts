import { isAuthenticated } from './../middlewares/isAuthenticated';
import express from "express"
import { createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateRestaurant } from "../controllers/restaurant.controller"
import upload from '../utils/multer';
const router = express.Router()

router.route("/").post(isAuthenticated, upload.single("imageFile"), createRestaurant)
router.route("/").post(isAuthenticated, getRestaurant)
router.route("/").put(isAuthenticated, upload.single("imageFile"), updateRestaurant)
router.route("/order").get(isAuthenticated, getRestaurantOrder)
router.route("/order/:orderId/status").put(isAuthenticated, getRestaurantOrder)
router.route("/search/:searchText").get(isAuthenticated, searchRestaurant)
router.route("/:id").get(isAuthenticated, getSingleRestaurant)

export default router