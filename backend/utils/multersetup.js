const multer=require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './backend/images/')
    },
    filename: function (req, file, cb) {
        console.log(file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      if(!req.images){
        req.images=[uniqueSuffix+file.originalname]
      }else{

          req.images.push(uniqueSuffix+file.originalname);
      }
      cb(null,  uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports=upload