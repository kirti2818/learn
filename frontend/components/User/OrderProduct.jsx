import Errmsg from "@/core/Errmsg";
import useAddProductsInOrder from "@/libs/mutations/User/useAddProductsInOrder";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const OrderProduct = ({ onClose, productId }) => {
  const {
    mutate: addProduct,
    isLoading: addProductLoading,
    isError: addProductError,
    isSuccess: addProductSuccess,
  } = useAddProductsInOrder();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    data = { ...data,  productId };
    console.log(data);
    addProduct(data)
  };
  useEffect(() => {
    if (addProductSuccess) {
      onClose();
    }
  }, [addProductSuccess]);
  return (
    <div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3">
          <Controller
            control={control}
            name="quantity"
            rules={{ required: "Quantity is Required" }}
            render={({ field: { onChange, value } }) => {
              return (
                <div>
                  <Input
                    size="none"
                    radius="none"
                    onChange={onChange}
                    value={value}
                    placeholder="Quantity"
                  />
                  <Errmsg name="quantity" err={errors} />
                </div>
              );
            }}
          />
        </div>

        <div className="flex gap-4 mt-10">
          <Button color="danger" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderProduct;
