const fs = require('fs');
const db = require('../model/db');
const productService = require('./productService');
const sss= require('../s3');

async function createImage(req, res) {

    const productId = req.params.pid;
    console.log("productId", productId)
    const file = req.file;
    console.log("file", req.file)
    if (!file) {
        res.status(400).send('No file uploaded.');
        throw 'No file uploaded.';
    }


    const product = await productService.getProduct(productId);

    console.log("product", product.dataValues);

    if (!product) {
        res.status(404).send('Product not found.');
        throw 'Product not found.';
    }
    const filename = file.originalname;

    let date_ob = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
 
    // Store image metadata in database


       const s3lostored =   await  sss.uploadImage(file);
       console.log("s3lostored chudham", s3lostored);

       const image = {
        product_id: productId,
        file_name: filename,
        date_created: date_ob,
        s3_bucket_path: s3lostored 
    };
    const result = await db.Image.create(image);

    console.log(result.image_id, "image_id")
    return {
        image_id: result.image_id,
        product_id: result.product_id,
        file_name: result.file_name,
        date_created: result.date_created,
        s3_bucket_path: result.s3_bucket_path
    };
}



const getAllImages = async (req, res) => {

    // Get product and image ids from request params
    const pid = req.params.pid;

    // Get image from database
    const image = await db.Image.findAll({
        attributes: ['image_id', 'product_id', 'file_name', 'date_created', 's3_bucket_path'],
        where: {
            product_id: pid
        }
    });

    // Check if image exists
    if (!image) {
        return res.status(404).send('Image not found.');
    }

    return image;
}

const getImageById = async (req, res) => {

    console.log("req.params", req.params);

    // Get product and image ids from request params
    const { pid, image_id } = req.params;

    // Get image from database
    const image = await db.Image.findOne({


        where: {
            image_id: image_id,
            product_id: pid
        }
    });

    // Check if image exists
    if (!image) {
        return res.status(404).send('Image not found.');
    }

    return {
        image_id: image.image_id,
        product_id: image.product_id,
        file_name: image.file_name,
        date_created: image.date_created,
        s3_bucket_path: image.s3_bucket_path
    }

}

const deleteImage = async (req, res) => {
    // Get product and image ids from request params
    const { pid, image_id } = req.params;

    // Get image from database
    const image = await db.Image.findOne({
        where: {
            image_id: image_id,
            product_id: pid
          // Ensure user can only delete their own images
        }
    });

    
    // Check if image exists
    if (!image) {
        return res.status(404).send('Image not found.');
    }
    const deleted = await  sss.deleteFile(image.s3_bucket_path);
    console.log("deleted chudham", deleted)
    await image.destroy();
return image;
}




module.exports = {
    createImage,
    getImageById,
    getAllImages,
    deleteImage
}