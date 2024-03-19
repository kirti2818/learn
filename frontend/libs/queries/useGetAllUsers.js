import api from "@/pages/api/api";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = (queries)=>{
    const query = useQuery({
        queryKey : ["/getAllUsers",queries],
        queryFn : async()=>{
            let Query =""
            
            console.log(Query);
            const response = await api.get(`/users/getAllUsers?search=${queries}`)
            console.log(response)
            return response?.data?.data
        }
    })
    return query
}

export default useGetAllUsers;