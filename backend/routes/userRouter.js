const express=require("express");
const router=express.Router();
const userController=require('../controllers/userController')
const authMiddleware=require('../middlewares/authMiddleware');
const upload=require('./../utils/multersetup')
router.use(authMiddleware.isAuthenticatedUser)
router.post('/addImages',upload.array('file'),userController.addImagesToGallery)
router.delete('/deleteImage/:image',userController.deleteImage)

module.exports=router