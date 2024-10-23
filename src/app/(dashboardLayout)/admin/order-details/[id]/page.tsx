import SingleOrderDetailsContainer from "@/components/dashboardLayout/orderDetails/[id]/SingleOrderDetailsContainer";
import React from "react";

const SingleOrderDetails = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <SingleOrderDetailsContainer id={params.id}></SingleOrderDetailsContainer>
    </div>
  );
};

export default SingleOrderDetails;
