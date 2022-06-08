const path = require('path')
const{StatusCodes} = require('http-status-codes')
const {UnauthenticatedError, NotFoundError,  BadRequestError} = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImageLocal = async(req,res) => {
    console.log(req.files);
    if (!req.files) {
        throw new BadRequestError('No file Uploaded')
    }
    const productImage = req.files.image
    if (!productImage.mimetype.startsWith('image')) {
        throw new BadRequestError('Please upload image')
    }

    const maxSize = 100000

    if (productImage.size > maxSize) {
        throw new BadRequestError('Please upload image less than 100kb')
    }

    const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`)
    await productImage.mv(imagePath)
    res.status(StatusCodes.OK).json({image:{src: `/uploads/${productImage.name}`}})
};

const uploadProductImage = async(req,res) => {
    // console.log(req.files.image);
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
        use_filename:true,
        folder:'file-upload',
    }
    )
    fs.unlinkSync(req.files.image.tempFilePath)
    // console.log(result);
    res.status(StatusCodes.OK).json({image:{src: result.secure_url}})
}


module.exports = {uploadProductImage};