import api from "@/pages/api/api";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const useGetAllWareHouse = ()=>{
    const query = useQuery({
        queryKey : ["/getAllWarehouse"],
        queryFn : async()=>{
           
            const response = await api.get(`/admin/getAllWareHouse`)
            console.log(response)
            return response?.data?.data
        }
    })
    return query
}

export default useGetAllWareHouse;