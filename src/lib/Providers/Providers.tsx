"use client";

import mainTheme from "@/themes/mainTheme";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
};

export default Providers;
