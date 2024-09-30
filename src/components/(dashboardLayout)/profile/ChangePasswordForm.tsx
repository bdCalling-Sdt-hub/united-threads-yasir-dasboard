"use client";
import { ConfigProvider } from "antd";
import { Form, Input, Button } from "antd";

const ChangePasswordForm = () => {
  // @ts-expect-error: Ignoring TypeScript error due to inferred 'any' type for 'values' which is handled in the form submit logic
  const onFinishChangePassword = (values) => {
    console.log("Change Password values:", values);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBgContainer: "transparent",
            activeBorderColor: "#243A40",
            colorTextPlaceholder: "rgb(192, 199, 202)",
            colorIcon: "rgba(255,255,255,0.45)",
            colorBorder: "#D9D9D9",
            colorText: "white",
          },
          Form: {
            labelColor: "white",
          },
          Button: {
            colorBgContainer: "rgb(248,250,252)",
            colorText: "rgb(35,35,35)",
          },
        },
      }}
    >
      <Form layout="vertical" onFinish={onFinishChangePassword}>
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[
            {
              required: true,
              message: "Please enter your current password!",
            },
          ]}
        >
          <Input.Password size="large" placeholder="Current Password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Please enter a new password!" }]}
        >
          <Input.Password size="large" placeholder="New Password" />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Confirm New Password" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" block size="large">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default ChangePasswordForm;
