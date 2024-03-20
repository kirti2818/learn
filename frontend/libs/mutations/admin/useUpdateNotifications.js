import api from "@/pages/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateNotifications = ()=>{
    const query = useQueryClient()
    const mutate = useMutation({
        mutationFn : async()=>{
            const response = await api.patch(`/admin/updateNotification`)
            return response?.data
        },onSuccess:(data)=>{
            toast.success(data?.message)
            query.invalidateQueries("/getAllNotifications")
        },onError:(error)=>{
            toast.error(error?.response?.data?.message)
        }
    })
    return mutate;
}
export default useUpdateNotifications