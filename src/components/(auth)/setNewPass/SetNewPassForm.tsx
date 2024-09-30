"use client";
import type { FormProps } from "antd";
import { Button, ConfigProvider, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FieldType = {
  newPass?: string;
  confirmPass?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SetNewPassForm = () => {
  const route = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    if (values?.newPass === values?.confirmPass) {
      toast.success("Successfully Password Reset");
    } else {
      toast.error("Does not match Comfirm Password");
    }
    route.push("/login");
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
          label="New Password"
          name="newPass"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input.Password size="large" placeholder="*******" />
        </Form.Item>

        <Form.Item<FieldType>
          name="confirmPass"
          label="Confirm Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password size="large" placeholder="*******" />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button
            htmlType="submit"
            size="large"
            style={{ backgroundColor: "#232323", color: "#F8FAFC" }}
          >
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default SetNewPassForm;
