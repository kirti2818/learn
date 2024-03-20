import api from "@/pages/api/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllProducts = (location)=>{
    const query = useQuery({
        queryKey : ["/getAllProducts",location],
        queryFn : async()=>{
            
            const response = await api.get(`/users/getAllProducts?lat=${location?.lat}&lng=${location?.lng}`)
            console.log(response)
            return response?.data?.data
        },enabled:Boolean(location)
    })
    return query
}

export default useGetAllProducts;