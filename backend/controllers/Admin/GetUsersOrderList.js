const AuthModel = require("../../models/Auth/Users");
const { ObjectId } = require("mongodb");

const GetUsersOrderList = async (req, res) => {
  const userId = req.params.id;
  try {
    const pipeline = [
      {
        $match: { _id: new ObjectId(userId) },
      },
      //   {$unwind : {path : "$products",preserveNullAndEmptyArrays : true}},
      {
        $lookup: {
          from: "orders",
          let: { orderIds: "$products" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$orderIds"] },
              },
            },
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productId",
              },
            },
            {
              $unwind: "$productId",
            },
          ],
          as: "products",
        },
      },


      {
        $group: {
          _id: "$_id",
          userData: { $first: "$$ROOT" },
         
           // Keep other user fields if needed
        },
      },
      { $replaceRoot: { newRoot: "$userData" } },
    ];
    const getAllOrders = await AuthModel.aggregate(pipeline);
    // console.log(getAllOrders, "GETALLORDERS");

    return res
      .status(200)
      .json({ message: "Get All Orders", status: true, data: getAllOrders });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = GetUsersOrderList;
