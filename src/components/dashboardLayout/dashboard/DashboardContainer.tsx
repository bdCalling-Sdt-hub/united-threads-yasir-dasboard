import EaringOverviewChart from "./EaringOverviewChart";
import ProductSellChart from "./ProductSellChart";
import RecentSellingProductTable from "./RecentSellingProductTable";
import StatisticBar from "./StatisticBar";

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
