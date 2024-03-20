import useUpdateNotifications from '@/libs/mutations/admin/useUpdateNotifications'
import { Spinner } from '@nextui-org/react'
import React from 'react'

const NotificationModal = ({data,loading,error,success}) => {

  return (  
    <div>
      {(!loading && !error && success) ?data?.data?.map((el)=>{
        return(
            <div>{el.text}</div>
        )
      } ): <Spinner/>}
    </div>
  )
}

export default NotificationModal
