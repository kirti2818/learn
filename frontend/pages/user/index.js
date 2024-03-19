import AdminSidebar from "@/components/admin/AdminSidebar";
import UserPanel from "@/components/admin/UserPanel";
import Warehouse from "@/components/admin/Warehouse";
import RedirectPrivatePages from "@/redirects/RedirectToPrivate";
import { jwtDecode } from "jwt-decode";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import Products from "./products";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

const User = () => {
const router = useRouter()
  return (
    <div className="">
     <Button color="primary" onClick = {()=>router.push("/user/products")}>Go To Product Page</Button>
    </div>
  );
};

// export default Admin

export const getServerSideProps = async ({req}) => {
  const decodedToken = req?.cookies?.learn 
    ? jwtDecode(req?.cookies?.learn)
    : {};
  const RedirectToLogin = await RedirectPrivatePages({decodedToken, req});
  if (RedirectToLogin) return RedirectToLogin;
  else if (decodedToken?.role!=="Admin"){
    return {
      redirect : {
          permanent : false,
          destination : "/"
      }
   }
  }


  return {
    props: {},
  };
};


export default dynamic(() => Promise.resolve(User), { ssr: false });


