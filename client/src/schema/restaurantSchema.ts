import {z} from 'zod'

export const restaurantFromSchema = z.object({
    restaurantname:z.string().nonempty({message : "Restaurnat Name is required"}),
    city:z.string().nonempty({message: "City is required!"}),
    country : z.string().nonempty({message:"country is required!"}),
    deliveryTime : z.number().min(0, {message:"Delivery time can not be negative"}),
    cuisines : z.array(z.string()),
    imageFile:z.instanceof(File).optional().refine((file)=>file?.size !== 0, {message:"Image file is required!"})
})


export type RestaurantFromSchema = z.infer<typeof restaurantFromSchema>