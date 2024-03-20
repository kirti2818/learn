const ProductModel = require("../../models/Products/product.model");
const WareHouseModel = require("../../models/Warhouse/adminWarehouse");

function calculateDistance({ lat1, lon1, lat2, lon2 }) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  console.log(distance,"DI")

  return distance;
}

const GetAllProducts = async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const getLocationWareHouse = await WareHouseModel.find();
let AllProducts = [];
    const promises = getLocationWareHouse.map(async (el) => {
      const distance = await calculateDistance({
        lon1: Number(el.longitude),
        lat1: Number(el.latitude),
        lon2: Number(lng),
        lat2: Number(lat),
      });

      if (distance <= 10) {
        console.log("distance",distance)
        const getAll = await ProductModel.find({ warehouse: el._id });
        AllProducts.push(...getAll)
      }
      return [];
    });

    const pro = await Promise.all(promises);

    if (AllProducts.length === 0) {
      return res
        .status(200)
        .json({ message: "No warehouse near you", status: true, data: AllProducts });
    }

    return res
      .status(200)
      .json({ message: "Get All Products", status: true, data: AllProducts });
  } catch (error) {
    console.log(`err`, error);
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = GetAllProducts;
