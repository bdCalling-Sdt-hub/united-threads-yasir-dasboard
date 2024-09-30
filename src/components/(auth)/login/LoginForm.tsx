"use client";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Flex, ConfigProvider } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = () => {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");

  console.log(user);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    localStorage.setItem("user", values?.email ? values?.email : "");
    setRole(values?.email?.split("@")[0] || "");
  };

  // Listen for changes in the `role` state and perform redirect
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
      const derivedRole = storedUser.split("@")[0];
      setRole(derivedRole);
    }
  }, []);

  useEffect(() => {
    if (role) {
      router.push(
        role === "admin"
          ? "/dashboard"
          : role === "csr"
          ? "/quote-details"
          : ""
      );
    }
  }, [role, router]);

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
          <Input size="large" type="email" placeholder="Example@gmail.com" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password size="large" placeholder="*******" />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          style={{ color: "#F8FAFC" }}
        >
          <Flex justify="space-between" align="center">
            <Checkbox style={{ color: "#F8FAFC" }}>Remember me</Checkbox>
            <Link href={"/forgetPassword"} style={{ textDecoration: "" }}>
              <p className="text-[#8ABA51]">Forgot Password?</p>
            </Link>
          </Flex>
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button
            htmlType="submit"
            size="large"
            style={{ backgroundColor: "#232323", color: "#F8FAFC" }}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default LoginForm;
