import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModels.js";


// function for add product
const addProduct = (req, res) => {
  try {
    const {name ,price, description, category, subCategory, size,bestselle } = req.body;

    const image1 =req.files.image1 && req.files.image1[0]
    const image2 =req.files.image2 && req.files.image2[0]
    const image3 =req.files.image3 && req.files.image3[0]
    const image4 =req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)

    let imagesUrl =  Promise.all(
      images.map(async (item) => {
      let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
      return result.secure_url;
    })
  )
const produtData ={
  name,
  description,
  category,
  price: Number(price),
  subCategory,
  bestselle: bestselle === "true" ? true : false,
  size: JSON.parse(size),
  images: imagesUrl,
  date: new Date()
}
const product = new productModel(produtData);
 product.save();

res.json({success:true, message: "Product Added Successfully"});
  } catch (error) {
    console.log(error)
    res.json({success:false, message: "Something went wrong"})
  }
}

// function for list product
const listProduct = (req, res) => {
  
  try {
    const products =  productModel.find({});
    res.json({success:true, products});
  } catch (error) {
    console.log(error)
    res.json({success:false, message: "Something went wrong"})
  }
}

// function for removing product
const removeProduct = (req, res) => {
  try {
     productModel.findByIdAndDelete(req.body.id);
     res.json({success:true, message: "Product Removed Successfully"});

  } catch (error) {
    console.log(error)
    res.json({success:false, message: "Something went wrong"})
  }
}


// function for single product info
const singleProduct = (req, res) => {
  try {
    const {productsId} =req.body;
    const product = productModel.findById(productsId);
    res.json({success:true, product});
  } catch (error) {
    console.log(error)
    res.json({success:false, message: "Something went wrong"})
  }
}



export { addProduct, listProduct, removeProduct, singleProduct };