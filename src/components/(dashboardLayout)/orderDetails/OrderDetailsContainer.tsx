import React from "react";
import OrderListTable from "./OrderListTable";
import { DatePicker } from "antd";


const OrderDetailsContainer = () => {
  

  return (
    <div>
      <div className="flex justify-between mb-9">
        <h1 className="text-2xl font-bold">Orders List</h1>
        <div>
          <DatePicker size="large" /> 
        </div>
      </div>
      <OrderListTable />
    </div>
  );
};

export default OrderDetailsContainer;

