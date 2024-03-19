import OrderProduct from '@/components/User/OrderProduct';
import DynamicModal from '@/core/DynamicModal';
import useAddProductsInOrder from '@/libs/mutations/User/useAddProductsInOrder';
import useGetAllProducts from '@/libs/queries/Users/useGetAllProducts'
import { Button, Spinner } from '@nextui-org/react';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';

const Products = () => {
    const {data : getAllProducts , isLoading : getAllProductsLoading ,isError : getAllProductsError , isSuccess : getAllProductsSuccess} = useGetAllProducts()
    const {mutate : AddProductInOrder} = useAddProductsInOrder()
    const [OpenOrderModal , setOpenOrderModal] = useState(false)
    const [productId , setProductId] = useState("")

    const columns = [
        {
          name: "Name",
          selector: (row) => (
            <div
              // onClick={() => handleShiftToGroup(row._id)}
              className="hover:text-purple-400 duration-300 transition-all cursor-pointer"
            >
              {row.name}
            </div>
          ),
          width: "240px",
        },
        {
          name: "Quantity",
          selector: (row) => <div>{row?.quantity <0 ? "Out Of Stock" : row?.quantity}</div>,
          width: "230px",
        },
        {
            name: "Left Count",
            selector: (row) => <div>{row?.leftCount}</div>,
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
              isDisabled={row?.quantity<=0 || row?.leftCount<=0}
                onClick={() => (setOpenOrderModal(true),setProductId(row?._id))}
                className="text-[12px]"
                size="sm"
                color="secondary"
              >
                Order
              </Button>
            </div>
          ),
        },
      ];
  return (
    <div>
    {
        OpenOrderModal && <DynamicModal closeModal={()=>setOpenOrderModal(false)} show={OpenOrderModal} openModal={OpenOrderModal} heading={"Order Product"} ><OrderProduct onClose={()=>setOpenOrderModal(false)} productId={productId}/> </DynamicModal>
    }
    <div className="mt-10">
    <DataTable
      columns={columns}
      data={
        !getAllProductsLoading &&
        !getAllProductsError &&
        getAllProductsSuccess
          ? getAllProducts
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
          {getAllProductsLoading ? <Spinner /> : <p>No Products</p>}
        </div>
      }
    />
  </div>
    </div>
  )
}

export default Products
