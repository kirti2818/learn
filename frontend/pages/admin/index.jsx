import AdminSidebar from "@/components/admin/AdminSidebar";
import UserPanel from "@/components/admin/UserPanel";
import Warehouse from "@/components/admin/Warehouse";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";

const Index = () => {
  //   const pathname = "warehouse";
  const { navVal } = useSelector((store) => store.adminSlice);
  console.log("navVal", navVal);
  return (
    <div className="">
      <div className="flex">
        <div className="w-[300px] min-h-screen ">
          <AdminSidebar />
        </div>
        <div className="flex-1">
          {navVal === "warehouse" ? <Warehouse /> : <UserPanel />}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
