import useUpdateOrder from "@/libs/mutations/admin/useUpdateOrder";
import useGetAllOrders from "@/libs/queries/Admin/useGetAllOrders";
import { Button, Spinner } from "@nextui-org/react";
import React from "react";
import DataTable from "react-data-table-component";

const UserOrderList = (userId) => {
  const {
    data: getAllOrders,
    isLoading: getAllOrdersLoading,
    isError: getAllOrdersError,
    isSuccess: getAllOrdersSuccess,
  } = useGetAllOrders(userId);
  const {mutate:Updateorder} = useUpdateOrder()
  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div
          // onClick={() => handleShiftToGroup(row._id)}
          className="hover:text-purple-400 duration-300 transition-all cursor-pointer"
        >
          {row?.productId?.name}
        </div>
      ),
      width: "240px",
    },
    {
      name: "Quantity",
      selector: (row) => <div>{row?.quantity}</div>,
      width: "230px",
    },

    {
      name: "Price",
      selector: (row) => <div>{row?.price}</div>,
      width: "230px",
    },

    {
      name: "Action",
      selector: (row) => (
        <div className="flex gap-4 ">
          <Button
            //   isDisabled={row?.quantity<=0 || row?.leftCount<=0}
            onClick={() =>
                Updateorder({ data: { approved: true }, id: row?._id })
            }
            className="text-[12px]"
            size="sm"
            variant={row?.approved ? "solid" : "bordered"}
            color="secondary"
          >
            Approve
          </Button>
          <Button
            //   isDisabled={row?.quantity<=0 || row?.leftCount<=0}
            onClick={() =>
                Updateorder({ data: { approved: false }, id: row?._id })
              }
            className="text-[12px]"
            size="sm"
            color="secondary"
            variant={row?.approved == false ? "solid" : "bordered"}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="mt-10">
        <DataTable
          columns={columns}
          data={
            !getAllOrdersLoading && !getAllOrdersError && getAllOrdersSuccess
              ? getAllOrders[0]?.products
              : []
          }
          // selectableRows
          persistTableHead
          fixedHeader
          responsive
          // paginationServer
          fixedHeaderScrollHeight="450px"
          pagination
          // paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
          noDataComponent={
            <div className="flex flex-col items-center justify-center p-4">
              {getAllOrdersLoading ? <Spinner /> : <p>No Orders</p>}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default UserOrderList;
