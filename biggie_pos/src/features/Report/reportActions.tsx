import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@utils/config";
import axios from "axios";

const baseUrl = `${BASE_URL}/orders`;

interface DateDetails {
  startDate: string;
  endDate: string;
  commission?: number,
  locationId?:string,
  createdBy?:string,
  servedBy?:string
}

export const generateSalesReport = createAsyncThunk(
  "report/generateSalesReport",
  async (dated: DateDetails, { rejectWithValue }) => {

    try {
      const response = await axios.get(`${baseUrl}/date-range-sales/items`,{params: {
          startDate: dated.startDate,
          endDate: dated.endDate,
          commission: dated?.commission,
          servedBy: dated?.servedBy,
          locationId: dated?.locationId
        }});      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error || error.toString());
    }
  }
);

export const generateVoidedReport = createAsyncThunk(
  "report/generateVoidedReport",
  async (dated: DateDetails, { rejectWithValue }) => {

    try {
      const response = await axios.get(`${baseUrl}/date-range-void/items`,{params: {
          startDate: dated.startDate,
          endDate: dated.endDate,
        }});
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error || error.toString());
    }
  }
);

export const generatePurchaseReport = createAsyncThunk(
  "report/generatePurchaseReport",
  async (dated: DateDetails, { rejectWithValue }) => {
    try { 
      const response = await axios.get(`${baseUrl}/order-payment-methods/summary`, {params: {
          startDate: dated.startDate,
          endDate: dated.endDate,
        }});

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error || error.toString());
    }
  }
);