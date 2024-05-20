const cloudinary=require('cloudinary');

const sendImageToCloudinary = async (images) => {
    try {
        let results = []
        for (let i = 0; i < images.lenght; i++) {
            let final=await cloudinary.v2.uploader.upload_large(path.join(__dirname ,`../images/${images[i]}`),{
                folder:'Gallery',
                width: 400,
                height: 450,
                quality: 100,
                crop: "scale",
            })
            results.push(final);
        }
        return results;
    } catch (err) {
        console.log(err);
    }
}


module.exports=sendImageToCloudinary