import { ParamsType } from "@ant-design/pro-components";
import { BASE_URL } from "@utils/config";
import axios from "axios";

export const fetchItemSalesReport = async (data: ParamsType) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/orders/date-range-sales/items`,
      {
        params: data,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
