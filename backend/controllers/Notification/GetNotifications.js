const NotificationModel = require("../../models/notification/notification.model");

const GetAllNotifications = async (req, res) => {
  try {
    const getAll = await NotificationModel.find();
    const getUnseenCount = await NotificationModel.find({ seen: false }).count()
    return res
      .status(200)
      .json({
        message: "Get All notifications ",
        status: true,
        unseenCount: getUnseenCount,
        data: getAll,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = GetAllNotifications;
