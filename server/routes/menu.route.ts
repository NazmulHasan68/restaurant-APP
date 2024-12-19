import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import upload from '../utils/multer'
import { Addmenu, editMenu } from '../controllers/menu.controller'
const router = express.Router()

router.route('/').post(isAuthenticated, upload.single("image"), Addmenu)
router.route('/').post(isAuthenticated, upload.single("image"), editMenu)

export default router