import { ParamsType } from "@ant-design/pro-components";
import axios from "axios";
import { BASE_URL } from "@utils/config";
import { Modal, notification } from "antd/lib";
import SetBearerHeaderToken from "@utils/SetBearerHeaderToken";

const tableUrl = `${BASE_URL}/tables`;
const { headers } = SetBearerHeaderToken();

export const getAllTables = async (data: ParamsType) => {
  try {
    const response = await axios.get(tableUrl, { params: {name: data.name, locatedAt: data.locatedAt} });
    return response.data;
  } catch (error) {
    Modal.error({
      title: "Oops!  Something went wrong.",
      content: "Please check your internet connection!",
    });
  }
};
export const createNewTable = async (data: ParamsType) => {
  try {
    const response = await axios.post(tableUrl,{...data}, {headers});
      notification.success({
        message: `Success`,
        description: "Successfully Added new slot",
        placement: "bottomLeft",
      });
    return response.data;
  } catch (error) {
    Modal.error({
      title: "Oops!  Something went wrong.",
      content: "Please check your internet connection!",
    });
  }
};

export const getTableLocation = async (data: ParamsType) => {
  try {
    const url = `${tableUrl}/location/locations`;
    const response = await axios.get(url, { params: { name: data.name } });
    return response.data;
  } catch (error) {
    Modal.error({
      title: "Oops! Something went wrong.",
      content: "Please check your internet connection!",
    });
  }
};

export const fetchTableUsequery = async () => {
  try {
    const response = await axios.get(
      `${tableUrl}/tables/unique-locatedAt`
    );
  
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const editLocation = async (data: ParamsType) => {
  try {
    const response = await axios.put(
      `${tableUrl}/locations/${data._id}`,
      { "locationName": data?.values?.name }
    );
    notification.success({
      message: `Success`,
      description: "Successfully edited Location",
      placement: "bottomLeft",
    });
    return response.data;
  } catch (error: any) {
    Modal.error({
      title: "Oops! Something went wrong.",
      content: "Please check your internet connection!",
    });
  }
};
export const addNewTableLocation = async (data: ParamsType) => {

  try {
    const response = await axios.post(`${tableUrl}/locations`, {
      "locationName": data?.name,
    });
    notification.success({
      message: `Success`,
      description: "Successfully Added new Location",
      placement: "bottomLeft",
    });
    return response.data;
  } catch (error: any) {
    Modal.error({
      title: "Oops! Something went wrong.",
      content: "Please check your internet connection!",
    });
  }
};

export const delLocation = async (data: ParamsType) => {
  try {
    const response = await axios.delete(`${tableUrl}/locations/${data}`);
    console.log(data);

    notification.success({
      message: `Success`,
      description: "Successfully deleted Location",
      placement: "bottomLeft",
    });
    return response.data;
  } catch (error) {
    Modal.error({
      title: "Oops! Something went wrong.",
      content: `${error?.response?.data?.error}`,
    });
    console.log(error);
  }
};


export const transferCartitems =async (data:ParamsType) => {
  try {
    const transferUrl = `${BASE_URL}/cart`
    // console.log({ products: data?.products, table: data?.table?.value });
     const response = await axios.post(`${transferUrl}/transfer-cart-items`, {products: data?.products, table: data.table?.value});

     return response.data;
    
  } catch (error) {
    console.log("failed to tranfer product", error);
    
    Modal.error({
      title: "Oops! Something went wrong.",
      content: "Please try again!",
    });
  }
}