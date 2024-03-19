import api from "@/pages/api/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllProducts = ()=>{
    const query = useQuery({
        queryKey : ["/getAllProducts"],
        queryFn : async()=>{
            
            const response = await api.get(`/users/getAllProducts`)
            console.log(response)
            return response?.data?.data
        }
    })
    return query
}

export default useGetAllProducts;