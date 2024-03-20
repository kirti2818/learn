const NotificationModel = require("../../models/notification/notification.model")

const UpdateNotification = async(req,res)=>{
    try {
        const updateNoti = await NotificationModel.updateMany({},{seen:true},{new : true})
        return res.status(200).json({message : "Notification Seen",status : true})
        
    } catch (error) {
        return res.status(400).json({message : error.message,status : false})
    }
}

module.exports = UpdateNotification