import { ParamsType } from "@ant-design/pro-components";
import axios from "axios";
import { BASE_URL } from "@utils/config";
import { Modal, notification } from "antd/lib";

export const fetchSystemSetupDetails = async () => {
  try {
    const url = `${BASE_URL}/users/fetch-system-setting/all`;
    const response = await axios.get(url);
    // console.log("system..", response.data);

    return response.data;
  } catch (error) {
    Modal.error({
      title: "Oops! Something went wrong.",
      content: "Please check your internet connection!",
    });
  }
};
export const fetchSystemSetupDetailsById = async () => {
  try {
    const url = `${BASE_URL}/users/fetch-system-setting/6637797763064f893911fd92`;
    // const url = `${BASE_URL}/users/fetch-system-setting/${localStorage.getItem("businessId")}`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    Modal.error({ 
      title: "Oops! Something went wrong.",
      content: "Please check your internet connection!",
    });
  }
};


export const createSystemSetup = async (data: ParamsType) => {
  try {
    const url = `${BASE_URL}/users/new-system-setting`;
    const response = await axios.post(url, data);
    localStorage.setItem("businessId", response?.data?._id)
    // console.log("create..", response.data);

    return response.data;
  } catch (error) {
    Modal.error({
      title: "Oops! Something went wrong.",
      content: "Please check your internet connection!",
    });
  }
};


export const updateSystemSetup = async (data: ParamsType) => {
  try {
    // console.log("update..", data);
    const url = `${BASE_URL}/users/update-system-setting`;
    const response = await axios.put(`${url}/${data._id}`, data.data2);
    notification.success({
      message: "Sytem Settings updated Successfuly",
      placement: "bottomLeft",

    })
    return response.data;
  } catch (error) {
    Modal.error({
      title: "Oops! Something went wrong.",
      content: "Please check your internet connection!",
    });
  }
};


export const fetchSystemPaymentDetails = async () => {

  const url = `${BASE_URL}/payment-methods/fetch-payment-detail/all`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};