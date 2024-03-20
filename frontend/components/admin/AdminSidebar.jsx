import { setNavVal } from "@/slice/adminSlice";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { MdWarehouse } from "react-icons/md";
import { useDispatch } from "react-redux";
import { IoIosNotifications } from "react-icons/io";
import useGetAllNotifications from "@/libs/queries/Admin/useGetAllNotifications";
import DynamicModal from "@/core/DynamicModal";
import NotificationModal from "./NotificationModal";
import useUpdateNotifications from "@/libs/mutations/admin/useUpdateNotifications";
import { Badge, Button } from "@nextui-org/react";

const mapList = [
  { name: "Warehouse", val: "warehouse", icon: MdWarehouse },
  { name: "User List", val: "user_panel", icon: FaUsers },
  // { name: "User Orders", val: "user_order", icon: FaUsers },
];

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const {
    data: getNotification,
    isLoading: getNotificationLoading,
    isError: getNotificationError,
    isSuccess: getNotificationSuccess,
  } = useGetAllNotifications();
  const {mutate : updateNotifications} = useUpdateNotifications()
  const [OpenNotificationModal, setOpenNotificationModal] = useState(false);

  const handleTheNav = (val) => {
    dispatch(setNavVal(val));
  };

  
  return (
    <div className="h-full border-r border-gray-600">
      {OpenNotificationModal && (
        <DynamicModal
          show={OpenNotificationModal}
          closeModal={() => setOpenNotificationModal(false)}
          heading={"All Notifications"}
          openModal={OpenNotificationModal}
        >
          <NotificationModal
            data={getNotification}
            loading={getNotificationLoading}
            error={getNotificationError}
            success={getNotificationSuccess}
          />
        </DynamicModal>
      )}
      <div className="flex pl-10 gap-4 items-center h-[100px]">
        <div>
          <GrUserAdmin className="h-10 w-10 text-purple-500" />
        </div>
        <p className="font-semibold text-[28px]">Admin</p>
       <Badge content= {!getNotificationLoading &&
        !getNotificationError &&
        getNotificationSuccess
          ? getNotification?.unseenCount
          : 0} color="primary">
       <Button
       isIconOnly
         
         onClick={() => (updateNotifications(),setOpenNotificationModal(true))}
       >
      
         {" "}
         <IoIosNotifications className="w-7 h-7" />
        
       </Button>
       </Badge>
      </div>
      {/* ui list  */}
      <div className="pl-4">
        {mapList.map((item, index) => (
          <div
            key={index}
            onClick={() => handleTheNav(item.val)}
            className="flex items-center cursor-pointer gap-4 p-4"
          >
            <item.icon className="h-6 w-6 text-purple-500" />
            <p className="">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
