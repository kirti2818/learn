const WareHouseModel = require("../../models/Warhouse/adminWarehouse");

const GetAllWareHouse = async (req, res) => {
  try {
    const getAllWareHouse = await WareHouseModel.find();
    return res
      .status(200)
      .json({
        message: "Get All Ware houses",
        status: true,
        data: getAllWareHouse,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = GetAllWareHouse
