"use clinet";
import React from "react";
import QuoteListTable from "./QuoteListTable";
import { DatePicker } from "antd";

const QuoteDetailsContainer = () => {
  return (
    <div>
      <div className="flex justify-between mb-9">
        <h1 className="text-2xl font-bold "> Quote List</h1>
        <div>
          <DatePicker size="large" />
        </div>
      </div>
      <QuoteListTable></QuoteListTable>
    </div>
  );
};

export default QuoteDetailsContainer;
