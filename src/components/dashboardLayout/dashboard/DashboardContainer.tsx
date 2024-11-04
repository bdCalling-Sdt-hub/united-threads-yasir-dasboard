import { Metadata } from "next";
import EaringOverviewChart from "./EaringOverviewChart";
import ProductSellChart from "./ProductSellChart";
import RecentSellingProductTable from "./RecentSellingProductTable";
import StatisticBar from "./StatisticBar";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | United Threads ",
    template: "%s | United Threads",
  },
  description: "Generated by create next app",
};

const DashboardContainer = () => {
  return (
    <div className='space-y-7'>
      <StatisticBar></StatisticBar>
      <div className='flex gap-8'>
        <ProductSellChart></ProductSellChart>
        <EaringOverviewChart></EaringOverviewChart>
      </div>
      <RecentSellingProductTable></RecentSellingProductTable>
    </div>
  );
};

export default DashboardContainer;
