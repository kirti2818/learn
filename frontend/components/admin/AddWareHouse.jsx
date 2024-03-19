import DynamicModal from "@/core/DynamicModal";
import Errmsg from "@/core/Errmsg";
import Mapper from "@/core/Mapper";
import useAddWareHouse from "@/libs/mutations/admin/useAddWareHouse";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddWareHouse = ({ onClose }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const {
    mutate: AddWareHouse,
    isLoading: AddWareHouseLoading,
    isError: AddWareHouseError,
    isSuccess: AddWareHouseSuccess,
  } = useAddWareHouse();
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);
  console.log(location);
  const onSubmit = async (data) => {
    console.log(data);
    if (!location) {
      toast.error("Please select the location");
    } else {
      data = {
        ...data,
        longitude: location?.longitude,
        latitude: location?.latitude,
      };
      //   console.log("data=>", data);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location?.longitude}&format=json`
      );
      //   console.log("response>", response);
      const address = response.data.display_name;
      //   console.log("address=>", address);
      data = { ...data, location : address };
      console.log("final data check", data);
      AddWareHouse(data);
    }
  };
  const handleTheClose = () => {
    setShowMap(false);
  };
  useEffect(()=>{
  if(AddWareHouseSuccess){
    onClose()
  }
  },[AddWareHouseSuccess])
  return (
    <div>
      <DynamicModal
        width="w-[1000px]"
        heading="Add Ware House"
        show={showMap}
        closeModal={() => setShowMap(false)}
      >
        <div className="h-[600px] w-[900px] flex justify-center items-center pl-8">
          <Mapper handleTheClose={handleTheClose} setter={setLocation} />
        </div>
      </DynamicModal>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3">
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is Required" }}
            render={({ field: { onChange, value } }) => {
              return (
                <div>
                  <Input
                    size="none"
                    radius="none"
                    onChange={onChange}
                    value={value}
                    placeholder="Name Of Ware house"
                  />
                  <Errmsg name="name" err={errors} />
                </div>
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-3 ">
          <p>Select warehouse location</p>
          <Button
            onClick={() => setShowMap(!showMap)}
            color={location ? "success" : "secondary"}
            size="sm"
            className="w-fit"
          >
            {location ? "selected" : "Tap to select"}
          </Button>
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

export default AddWareHouse;
