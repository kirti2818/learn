import api from "@/pages/api/api";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const useGetAllOrders = ({userId})=>{
    console.log(userId)
    const query = useQuery({
        queryKey : ["/getAllOrders",userId],
        queryFn : async()=>{
           
            const response = await api.get(`/admin/getUsersOrderList/${userId}`)
            console.log(response)
            return response?.data?.data
        }
    })
    return query
}

export default useGetAllOrders;