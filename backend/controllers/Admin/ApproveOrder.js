const AuthModel = require("../../models/Auth/Users");
const OrderModel = require("../../models/Orders/Order.schema");
const ProductModel = require("../../models/Products/product.model");

const ApproveOrder = async (req, res) => {
  const userId = req.userId;
  const orderId = req.params.id;
  console.log(orderId, req.body);
  try {
    const findOrder = await OrderModel.findById(orderId);

    if (findOrder) {
      if (!req.body?.approved) {
        const findProduct = await ProductModel.findById(findOrder?.productId);
        const AddProductQuantity = await ProductModel.findByIdAndUpdate(
          findOrder?.productId,
          { leftCount: findProduct?.leftCount + Number(findOrder?.quantity) },
          { new: true }
        );
        const updateOrder = await OrderModel.findByIdAndUpdate(orderId,{...req.body},{new : true})
        return res
        .status(200)
        .json({ message: "Order Disapproved", status: true });
      } else {
        const updateOrder = await OrderModel.findByIdAndUpdate(orderId,{...req.body},{new : true})
        return res
          .status(200)
          .json({ message: "Order approved", status: true });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Order Not Found", status: false });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = ApproveOrder;
