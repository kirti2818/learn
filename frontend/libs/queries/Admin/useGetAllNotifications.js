import api from "@/pages/api/api";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const useGetAllNotifications = ()=>{

    const query = useQuery({
        queryKey : ["/getAllNotifications"],
        queryFn : async()=>{
           
            const response = await api.get(`/admin/getNotifications`)
            console.log(response)
            return response?.data
        }
    })
    return query
}

export default useGetAllNotifications;