const AuthModel = require("../../models/Auth/Users");
const OrderModel = require("../../models/Orders/Order.schema");
const ProductModel = require("../../models/Products/product.model");

const AddProductInOrder = async (req, res) => {
  const userId = req.userId;
  console.log(req.body)
  try {
    const findProduct = await ProductModel.findById(req.body?.productId)
    if(findProduct){
        if(Number(req.body?.quantity) > findProduct?.leftCount){
            return res.status(400).json({ message: "Product Quantity more than left Count", status: false });
        }
        if(Number(req.body?.quantity) <=0){
            return res.status(400).json({ message: "Product Quantity is in negative or 0", status: false });
        }

        const AddOrder = await OrderModel.create({...req.body,price : req.body?.quantity * findProduct.price})
        const AddproductInUser = await AuthModel.findByIdAndUpdate(
            userId,
            { $push : {products : AddOrder?._id }},
            { new: true }
          );
          const LessProductQuantity = await ProductModel.findByIdAndUpdate(req.body?.productId,{leftCount : (findProduct?.leftCount - Number(req.body?.quantity))},{new : true})
          return res.status(200).json({ message: "Product Ordered", status: true });
    }
    else{
        return res.status(400).json({ message: "Product Not Found", status: false });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = AddProductInOrder;
