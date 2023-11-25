import  express from 'express'
import{registerController,logincontoller,testController} from '../controllers/authController.js';
import {requireSignIn,Isadmin} from "../middlewares/authMiddleware.js"
//router object

const router = express.Router()
//routing
//register//method post 
router.post ('/register',registerController)
//login||post
router.post('/login',logincontoller)

// test routes 
router.get('/test',requireSignIn,Isadmin,testController)

export default router;