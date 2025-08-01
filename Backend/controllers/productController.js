import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

//function for add  product

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Fetch uploaded images from req.files
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload images to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url; // Secure URL from Cloudinary response
            })
        );

        // Prepare product data
        const productData = {
            name,
            description,
            category,
            price,
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        };

        console.log(productData); // Log product data for debugging
        const product = new productModel(productData);
        await product.save();

        // Include images URL in response
        res.json({
            success: true,
            message: 'Product added successfully',
            images: imagesUrl // Returning uploaded image URLs in response
        });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};


//function for list product

const listProduct = async (req, res) => {
    try {
        const page=parseInt(req.query.page) || 1;
        const perPage=8
        const products = await productModel.find({});
        const totalPosts=products.length;
        const totalPages=Math.ceil(totalPosts/perPage);
        if(page>totalPages){
            return res.json({success:false,message:"Page not found"})
        }
        const posts=await productModel.find({}).skip((page-1)*perPage).limit(perPage);

        res.json({ success: true, posts,totalPosts,totalPages })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

// function for removing product

const removeProduct = async (req, res) => {
    try {
      await productModel.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: 'Product removed successfully' });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

//function fo single product info

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId);
        res.json({ success: true, product })
    } catch (error) {
        console.log(err);
        res.json({ success: false, message: err.message })

    }

}

export {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct
}