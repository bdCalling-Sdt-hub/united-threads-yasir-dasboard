"use client";
import {
  Button,
  ColorPicker,
  Form,
  FormProps,
  InputNumber,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { LuCalendarDays } from "react-icons/lu";
import { TbMessage } from "react-icons/tb";
import uploadedImage from "@/assets/image/hoddieImage.png";
import Link from "next/link";

// Reset FieldType to match the form fields
type FieldType = {
  category: string;
  size: string;
  color: string;
  quantity: number;
  materialPreference: string;
  price: number;
};

const handleSizeChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const QuoteOrderDetailsContainer = () => {
  // Setting initial values for all input fields
  const initialValues: FieldType = {
    category: "Hoddie",
    size: "L",
    color: "#455A63",
    quantity: 10,
    materialPreference:
      "Combinations of materials are looking for 10% cotton , 90% polyester",
    price: 50,
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold ">Orders ID: #6743</p>
          </div>
          <div className=" flex items-center gap-3 mt-3 mb-5">
            <LuCalendarDays className=" w-6 h-6" />
            <p className=" text-md">Feb 16,2022</p>
          </div>
          <Link href={"/message/userName"}>
            <Button size="large" icon={<TbMessage />}>
              Message
            </Button>
          </Link>
        </div>
        <div className="flex gap-3">
          <CiUser className="w-12 h-12 rounded-md bg-primaryBlack text-parimaryWhite py-2 px-2" />

          <div>
            <h2 className="text-xl font-bold mb-3">Retailer </h2>
            <p className=" mb-2">Full Name: Emon</p>
            <p className=" mb-2">Email: emon@gmail.com</p>
            <p className=" mb-2">Phone: +545412110</p>
            <p className=" mb-2">Address: Keraniganj, Dhaka</p>
          </div>
        </div>
      </div>

      {/* product information */}

      <div>
        <div>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
          >
            <div className="space-y-5">
              <div className="flex justify-between">
                <div className="lg:w-1/3 w-full">
                  <div>
                    <Form.Item label="category" name="category">
                      <Select size="large" disabled></Select>
                    </Form.Item>
                  </div>
                  {/* input size */}

                  <Form.Item label="Size" name="size">
                    <Select
                      size="large"
                      placeholder="Please Select a size"
                      onChange={handleSizeChange}
                      options={[
                        { value: "S", label: "S" },
                        { value: "M", label: "M" },
                        { value: "L", label: "L" },
                        { value: "XL", label: "XL" },
                        { value: "XXL", label: "XXL" },
                      ]}
                    />
                  </Form.Item>

                  <div className="flex gap-x-5">
                    <div className="border-r-2 pr-5">
                      {/* input color */}
                      <Form.Item label="Color" name="color">
                        <ColorPicker size="large" showText></ColorPicker>
                      </Form.Item>
                    </div>

                    <div>
                      <h1 className="text-lg ">Pantone code</h1>
                      <p className="mt-2 text-lg">2736c</p>
                    </div>
                  </div>

                  {/* input quantity */}
                  <Form.Item label="Quantity" name="quantity">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Please input quantity"
                    />
                  </Form.Item>

                  {/* input Materials Preference */}
                  <Form.Item
                    label="Materials Preference"
                    name="materialPreference"
                  >
                    <TextArea rows={4} placeholder="Write here....." />
                  </Form.Item>
                </div>

                <div className="lg:w-1/3 w-full">
                  {/* input Product Price */}
                  <Form.Item label="Product Price" name="price">
                    <InputNumber
                      size="large"
                      style={{ width: "100%", borderRadius: "10px" }}
                      placeholder="Please input product price"
                    />
                  </Form.Item>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <Image
                        src={uploadedImage}
                        alt="productImage"
                        className="border border-black px-4 py-8"
                      />
                      <figcaption className="text-[#00B047] text-xl font-medium">
                        Front Side
                      </figcaption>
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <Image
                        src={uploadedImage}
                        alt="productImage"
                        className="border border-black px-4 py-8"
                      />
                      <figcaption className="text-[#00B047] text-xl font-medium">
                        Back Side
                      </figcaption>
                    </div>
                  </div>
                </div>
              </div>

              <Button htmlType="submit" block size="large">
                Quote Accept
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default QuoteOrderDetailsContainer;
