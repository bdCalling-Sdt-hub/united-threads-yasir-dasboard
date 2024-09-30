"use client";
import type { FormProps } from "antd";
import { Button, ConfigProvider, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ForgetPasswordForm = () => {
  const route = useRouter();

  //handle password change
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);

    if (values.email) {
      route.push("/verifyEmail");
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "rgb(248,250,252)",
          },
        },
      }}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="md:w-[481px]"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input size="large" placeholder="Example@gamil.com" />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button
            htmlType="submit"
            size="large"
            style={{ backgroundColor: "#232323", color: "#F8FAFC" }}
          >
            Send Code
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default ForgetPasswordForm;
