import React, { useCallback, useEffect } from "react";
import OrderList from "../../components/Order/OrderList";
import { Typography } from "@mui/material";
import { fetchOrders } from "../../features/Order/OrderActions";
import { useAppDispatch, useAppSelector } from "../../store";
import Spinner from "../../components/spinner/Spinner";
import CartLoader from "../../components/spinner/cartLoader";



const Orders: React.FC = () => {
  const { orders, loading, error } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch()
  const dispatchFetchOrders = useCallback(async() => {
    dispatch(fetchOrders());
  },[dispatch]);

  useEffect(() => {
    dispatchFetchOrders();
  }, [dispatchFetchOrders]);

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
        List of all the Orders
      </Typography>
        {loading && error ? <CartLoader/>:<OrderList orders={orders} />}
      </div>
    </div>
  );
};

export default Orders;
