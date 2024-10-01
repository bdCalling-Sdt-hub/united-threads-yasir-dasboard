"use client";

import mainTheme from "@/themes/mainTheme";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AntdRegistry>
        <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>
      </AntdRegistry>
    </Provider>
  );
};

export default Providers;
